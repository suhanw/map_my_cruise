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
  belongs_to :notifiable, polymorphic: true
  belongs_to :user
end
