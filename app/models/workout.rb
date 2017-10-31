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

  belongs_to :user
  belongs_to :route
  has_many :comments

end
