class AddZipcodeToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :zipcode, :integer
  end
end
