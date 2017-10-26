class CreateRoutes < ActiveRecord::Migration[5.1]
  def change
    create_table :routes do |t|
      t.integer :user_id, null:false
      t.string :name, null:false
      t.string :polyline, null:false
      t.string :city
      t.float :distance
      t.float :elevation
      t.string :privacy

      t.timestamps
    end
    add_index :routes, :user_id
  end
end
