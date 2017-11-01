require 'test_helper'

class Api::FriendStatusesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_friend_statuses_index_url
    assert_response :success
  end

  test "should get create" do
    get api_friend_statuses_create_url
    assert_response :success
  end

  test "should get update" do
    get api_friend_statuses_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_friend_statuses_destroy_url
    assert_response :success
  end

end
