class AddDateToWorkout < ActiveRecord::Migration[5.1]
  def change
    add_column :workouts, :workout_date, :date
  end
end
