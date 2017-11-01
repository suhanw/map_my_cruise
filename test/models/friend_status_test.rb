# == Schema Information
#
# Table name: friend_statuses
#
#  id            :integer          not null, primary key
#  friender_id   :integer          not null
#  friendee_id   :integer          not null
#  friend_status :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class FriendStatusTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
