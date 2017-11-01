# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Route.destroy_all
Route.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  name: "best route",
  polyline: "u{pwFz`|bMlCPjEb@]dImDYmBQ]jIy@dTvGn@zAJb@gAZs@zA_Ep@yAd@uAH}Cv@oR@e@TB",
  city: "Jersey City, NJ, USA",
  distance: 1.1,
})

Route.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  name: "test route",
  polyline: "gfqwFbt|bMrIr@zGl@zGh@@]",
  city: "Jersey City, NJ, USA",
  distance: 0.3,
})

Route.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  name: "test route2",
  polyline: "o~wwFfiobMbBkF|@p@zD`C|B~AxDfC~@j@vB~A|BzA|DfCzD`CfCbBdCdBlNhJzBtAOd@",
  city: "New York, NY, USA",
  distance: 0.9,
})

Workout.destroy_all
Workout.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  route_id: Route.find_by(name: 'best route').id,
  name: 'workout1',
  duration: 2100,
  workout_date: '2017-10-31'
})
Workout.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  route_id: Route.find_by(name:'best route').id,
  name: 'workout2',
  duration: 2234,
  workout_date: '2017-10-25'
})
Workout.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  route_id: Route.find_by(name: 'test route').id,
  name: 'workout3',
  duration: 1810,
  workout_date: '2017-8-31'
})

Comment.destroy_all
Comment.create!({
  user_id: User.find_by(email:'suhan@test.com').id,
  workout_id: Workout.find_by(name: 'workout1').id,
  body: 'comment1'
})
Comment.create!({
  user_id: User.find_by(email:'suhan@test.com').id,
  workout_id: Workout.find_by(name: 'workout1').id,
  body: 'comment2'
})
Comment.create!({
  user_id: User.find_by(email:'suhan@test.com').id,
  workout_id: Workout.find_by(name: 'workout1').id,
  body: 'comment3'
})

FriendStatus.destroy_all
FriendStatus.create!({
  friender_id: User.find_by(email:'eh@mi.com').id,
  friendee_id: User.find_by(email:'suhan@test.com').id,
  friend_status: 'yes'
  })
FriendStatus.create!({
  friender_id: User.find_by(email:'eh@mi.com').id,
  friendee_id: User.find_by(email:'suhan2@test.com').id,
  friend_status: 'pending'
  })
FriendStatus.create!({
  friender_id: User.find_by(email:'suhan3@test.com').id,
  friendee_id: User.find_by(email:'eh@mi.com').id,
  friend_status: 'yes'
  })
FriendStatus.create!({
  friender_id: User.find_by(email:'suhan5@test.com').id,
  friendee_id: User.find_by(email:'eh@mi.com').id,
  friend_status: 'pending'
  })
