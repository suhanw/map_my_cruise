# == Schema Information
#
# Table name: activities
#
#  id            :integer          not null, primary key
#  feedable_type :string
#  feedable_id   :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :integer
#

require 'test_helper'

class ActivityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
