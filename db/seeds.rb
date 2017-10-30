# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Route.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  name: "test33",
  polyline: "u{pwFz`|bMlCPjEb@]dImDYmBQ]jIy@dTvGn@zAJb@gAZs@zA_Ep@yAd@uAH}Cv@oR@e@TB",
  city: "Jersey City, NJ, USA",
  distance: 1.1,
});

Route.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  name: "test31",
  polyline: "gfqwFbt|bMrIr@zGl@zGh@@]",
  city: "Jersey City, NJ, USA",
  distance: 0.3,
});

Route.create!({
  user_id: User.find_by(email:'eh@mi.com').id,
  name: "test21",
  polyline: "o~wwFfiobMbBkF|@p@zD`C|B~AxDfC~@j@vB~A|BzA|DfCzD`CfCbBdCdBlNhJzBtAOd@",
  city: "New York, NY, USA",
  distance: 0.9,
});
