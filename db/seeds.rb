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
  name: "JC Monday run",
  polyline: "u{pwFz`|bMlCPjEb@]dImDYmBQ]jIy@dTvGn@zAJb@gAZs@zA_Ep@yAd@uAH}Cv@oR@e@TB",
  city: "Jersey City, NJ, USA",
  distance: 1.1,
})

Route.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  name: "JC Tuesday run",
  polyline: "gfqwFbt|bMrIr@zGl@zGh@@]",
  city: "Jersey City, NJ, USA",
  distance: 0.3,
})

Route.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  name: "Midtown run",
  polyline: "o~wwFfiobMbBkF|@p@zD`C|B~AxDfC~@j@vB~A|BzA|DfCzD`CfCbBdCdBlNhJzBtAOd@",
  city: "New York, NY, USA",
  distance: 0.9,
})

Workout.destroy_all
Workout.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  route_id: Route.find_by(name: 'JC Monday run').id,
  name: 'Halloween Run',
  duration: 2100,
  workout_date: '2017-10-31'
})
Workout.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  route_id: Route.find_by(name:'JC Monday run').id,
  name: 'Guilt Run',
  duration: 2234,
  workout_date: '2017-10-25'
})
Workout.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  route_id: Route.find_by(name: 'JC Tuesday run').id,
  name: 'Summer Run',
  duration: 1810,
  workout_date: '2017-8-31'
})

Comment.destroy_all
Comment.create!({
  user_id: User.find_by(email:'m@tg.com').id,
  workout_id: Workout.find_by(name: 'Halloween Run').id,
  body: 'Good job, Ethan!'
})
Comment.create!({
  user_id: User.find_by(email:'d@d.com').id,
  workout_id: Workout.find_by(name: 'Halloween Run').id,
  body: 'Disappointment...'
})
Comment.create!({
  user_id: User.find_by(email:'d@d.com').id,
  workout_id: Workout.find_by(name: 'Halloween Run').id,
  body: 'I ran this route in half the time..'
})

FriendStatus.destroy_all
FriendStatus.create!({
  friender_id: User.find_by(email:'eh@mi.com').id,
  friendee_id: User.find_by(email:'v@c.com').id,
  friend_status: 'yes'
  })
FriendStatus.create!({
  friender_id: User.find_by(email:'eh@mi.com').id,
  friendee_id: User.find_by(email:'ja@mr.com').id,
  friend_status: 'pending'
  })
FriendStatus.create!({
  friender_id: User.find_by(email:'c@eot.com').id,
  friendee_id: User.find_by(email:'eh@mi.com').id,
  friend_status: 'yes'
  })
FriendStatus.create!({
  friender_id: User.find_by(email:'lg@tt.com').id,
  friendee_id: User.find_by(email:'eh@mi.com').id,
  friend_status: 'pending'
  })
FriendStatus.create!({
  friender_id: User.find_by(email:'m@tg.com').id,
  friendee_id: User.find_by(email:'eh@mi.com').id,
  friend_status: 'pending'
  })
