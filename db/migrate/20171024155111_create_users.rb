class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :fname, null:false
      t.string :lname, null:false
      t.string :email, null:false
      t.string :country
      t.date :dob
      t.string :gender
      t.string :password_digest, null:false
      t.string :session_token, null:false

      t.timestamps
    end
    add_index :users, :session_token
  end
end
