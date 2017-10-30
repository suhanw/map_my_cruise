# == Schema Information
#
# Table name: workouts
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  route_id   :integer          not null
#  name       :string           not null
#  privacy    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  duration   :integer
#

class Workout < ApplicationRecord
  validates :user, :route, :name, :duration, presence: true

  belongs_to :user
  belongs_to :route
  
end
