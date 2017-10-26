# == Schema Information
#
# Table name: routes
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  name       :string           not null
#  polyline   :text             not null
#  city       :string
#  distance   :float
#  elevation  :float
#  privacy    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class RouteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
