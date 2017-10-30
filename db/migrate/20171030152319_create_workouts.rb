class CreateWorkouts < ActiveRecord::Migration[5.1]
  def change
    create_table :workouts do |t|
      t.integer :user_id, null: false
      t.integer :route_id, null: false
      t.string :name, null: false
      t.string :duration, null: false
      t.string :privacy

      t.timestamps
    end
  end
end
