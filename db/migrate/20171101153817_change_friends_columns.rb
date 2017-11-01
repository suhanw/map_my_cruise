class ChangeFriendsColumns < ActiveRecord::Migration[5.1]
  def change
    rename_column :friend_statuses, :first_user_id, :friender_id
    rename_column :friend_statuses, :second_user_id, :friendee_id
  end
end
