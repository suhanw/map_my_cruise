# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171116230645) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string "feedable_type"
    t.bigint "feedable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["feedable_type", "feedable_id"], name: "index_activities_on_feedable_type_and_feedable_id"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "workout_id", null: false
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_comments_on_user_id"
    t.index ["workout_id"], name: "index_comments_on_workout_id"
  end

  create_table "friend_statuses", force: :cascade do |t|
    t.integer "friender_id", null: false
    t.integer "friendee_id", null: false
    t.string "friend_status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friender_id", "friendee_id"], name: "index_friend_statuses_on_friender_id_and_friendee_id", unique: true
  end

  create_table "routes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "name", null: false
    t.text "polyline", null: false
    t.string "city"
    t.float "distance"
    t.float "elevation"
    t.string "privacy"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_routes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "fname", null: false
    t.string "lname", null: false
    t.string "email", null: false
    t.string "country"
    t.date "dob"
    t.string "gender"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.index ["session_token"], name: "index_users_on_session_token"
  end

  create_table "workouts", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "route_id", null: false
    t.string "name", null: false
    t.string "privacy"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "duration"
    t.date "workout_date"
  end

end
