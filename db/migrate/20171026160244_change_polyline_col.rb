class ChangePolylineCol < ActiveRecord::Migration[5.1]
  def change
    change_column :routes, :polyline, :text
  end
end
