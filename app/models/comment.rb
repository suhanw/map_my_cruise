# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  workout_id :integer          not null
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord
  validates :user_id, :workout_id, presence: true
  validate :validate_body

  belongs_to :user
  belongs_to :workout

  has_one :notification, as: :notifiable, dependent: :destroy

  private
  def validate_body
    if body == ""
      errors.add(:base, "Are you speechless by how awesome Tom Cruise is at running in an awesome manner?")
    end
  end
end
