class CreateLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :likes do |t|
      t.integer :user_id, null: false
      t.references :likable, polymorphic: true, index: true, null: false
      t.timestamps
    end
  end
end
