class ChangeDurationFieldToInteger < ActiveRecord::Migration[5.1]
  def change
    remove_column :workouts, :duration
    add_column :workouts, :duration, :integer
  end
end
