require 'test_helper'

class Api::NotificationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_notifications_index_url
    assert_response :success
  end

end
