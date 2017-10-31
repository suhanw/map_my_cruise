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

require 'test_helper'

class WorkoutTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
