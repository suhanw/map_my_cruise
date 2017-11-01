class CreateFriendStatuses < ActiveRecord::Migration[5.1]
  def change
    create_table :friend_status do |t|
      t.integer :first_user_id, null: false
      t.integer :second_user_id, null: false
      t.string :friend_status, null: false

      t.timestamps
    end
    add_index :friend_status, [:first_user_id, :second_user_id], unique: true
  end
end
