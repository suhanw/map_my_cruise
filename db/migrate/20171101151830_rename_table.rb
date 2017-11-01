class RenameTable < ActiveRecord::Migration[5.1]
  def change
    rename_table :friend_status, :friend_statuses
  end
end
