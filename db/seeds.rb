# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Route.create!(user_id: User.find_by(email:'eh@mi.com').id, name: 'test1', polyline: 'axvwFntpbMkC~I|a@bYtGuR');
Route.create!(user_id: User.find_by(email:'eh@mi.com').id, name: 'test2', polyline: 'yrvwFxisbMvEkOzRjOfNce@vT`R');
Route.create!(user_id: User.find_by(email:'eh@mi.com').id, name: 'test3', polyline: 'oorwFvlsbMdImWnEhC{Nra@`EbE');
Route.create!(user_id: User.find_by(email:'eh@mi.com').id, name: 'test4', polyline: 'axvwFntpbMkC~I|a@bYtGuR');
Route.create!(user_id: User.find_by(email:'eh@mi.com').id, name: 'test5', polyline: 'w_rwFp}zbM~UuqClW}b@');
