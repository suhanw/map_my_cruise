# == Schema Information
#
# Table name: workouts
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  route_id     :integer          not null
#  name         :string           not null
#  privacy      :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  duration     :integer
#  workout_date :date
#

class Workout < ApplicationRecord
  validates :user, :route, :name, :duration, :workout_date, presence: true
  validates :name, uniqueness: { scope: :user }
  validates :duration, numericality: { greater_than: 0 }
  validate :workout_date_cannot_be_in_the_future

  belongs_to :user
  belongs_to :route
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  has_one :activity, as: :feedable, dependent: :destroy

  private
  def workout_date_cannot_be_in_the_future
    if workout_date > Date.today
      errors.add(:base, "Please do not use future date. You are not in Edge of Tomorrow.")
    end
  end
end
