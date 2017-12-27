# == Schema Information
#
# Table name: notifications
#
#  id              :integer          not null, primary key
#  notifiable_type :string
#  notifiable_id   :integer
#  user_id         :integer
#  read            :boolean
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Notification < ApplicationRecord
  after_create :trigger_push_event

  belongs_to :notifiable, polymorphic: true
  belongs_to :user

  private
  def trigger_push_event
    # create Pusher channel specific to resource owner
    owner_channel = "user_#{self.user_id}"
    Pusher.trigger(owner_channel, 'notification_event', {
      message: "this is #{self.user.email}'s #{self.notifiable_type} notification"
    })
  end
end
