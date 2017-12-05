class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.references :notifiable, polymorphic: true, index: true
      t.integer :user_id
      t.boolean :read
      t.timestamps
    end
  end
end
