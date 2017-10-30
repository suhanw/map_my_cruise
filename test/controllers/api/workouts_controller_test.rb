require 'test_helper'

class Api::WorkoutsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_workouts_index_url
    assert_response :success
  end

  test "should get show" do
    get api_workouts_show_url
    assert_response :success
  end

  test "should get create" do
    get api_workouts_create_url
    assert_response :success
  end

  test "should get update" do
    get api_workouts_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_workouts_destroy_url
    assert_response :success
  end

end
