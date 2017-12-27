# MapMyCruise

[MapMyCruise](http://mapmycruise.herokuapp.com)

MapMyCruise is a full-stack web application inspired by MapMyRun. It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Redux architectural framework on the frontend.

## Features & Implementation

### Single page

MapMyCruise is a single page app that allows for quick navigation between its various components. As data is fetched from Rails, components are only updated when necessary.

### Routes

Routes are stored at the database level associated with `user_id`. Route creators can freely edit and delete their own routes. Route creation is accomplished using Google Maps API. A user creates a route by choosing 2 points on a map (start and end), which sends a DirectionsService request to calculate the best route between those 2 points. A DirectionsRenderer object is initialized to receive the response and render the calculated route on the map. The user can choose to further customize the route by dragging along any point on the route. The route is finally persisted to the database as an encoded string that represents a Polyline object.

![Routes](docs/README_gifs/routes.gif)

### Workouts

Workouts are associated with `user_id` and `route_id`. After planning a route, a user can log a workout with that route. Workout creators can freely edit and delete their own workouts.

![Routes](docs/README_gifs/workouts.gif)


### Friending

Friends are stored at the database level as a join table associating `friender_id` and `friendee_id`, with a `friend_status` flag. 'Friender' is a user who makes the friend request, whereas 'friendee' is the user who receives the request. A user can view existing friends, friend requests, and friend requests received from other users.

![Routes](docs/README_gifs/friends.gif)

### Activity Feed

The landing page upon login is a feed that displays the current user's as well as his/her friends' activities, which includes the creation of new routes, logging of new workouts, and new friendships. On the backend, an `activities` table is designed with polymorphic associations to the `routes`, `workouts`, and `friend_status` tables, to keep DRY code and enable scalability for future implementation of new "activities". The activity feed is implemented with infinite scroll to reduce page size for quicker loading, where newest activities are rendered at the top, and older activities are only fetched asynchronously and inserted into the page as the user scrolls towards the bottom.

![Routes](docs/README_gifs/activity_feed.gif)

### Likes

`likes` are designed with polymorphic associations with `routes` and `workouts` to keep DRY modular code as well as enable scalability for other resources that can be likable in the future.

``` Ruby
class Like < ApplicationRecord
  ...
  belongs_to :likable, polymorphic: true
  ...
end

class Route < ApplicationRecord
  ...
  has_many :likes, as: :likable, dependent: :destroy
  ...
end

class Workout < ApplicationRecord
  ...
  has_many :likes, as: :likable, dependent: :destroy
  ...
end
```

Routing concern is used to declare common `like` routes for `likables` that include `routes` and `workouts`.
```Ruby
concern :likable do
  resources :likes, only: [:create]
end

resources :routes, only: [:index, :show, :create, :update, :destroy], concerns: [:likable]
resources :workouts, only: [:index, :show, :create, :update, :destroy], concerns: [:likable, :commentable]
```

`likes` are associated with the relevant `likable` in the controller
```Ruby
class Api::LikesController < ApplicationController
  ...

  def create
    load_likable
    @like = @likable.likes.new(user: current_user)
    @like.notification = Notification.new(user_id: @likable.user_id, read: false)
    if @like.save
      render :show, status: 200
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  ...

  private
  def load_likable
    resource, id = request.path.split('/').slice(2, 2)
    @likable = resource.singularize.classify.constantize.find(id)
  end
end
```




### Comments

Comments are associated with `user_id` and `workout_id`. The associated comments are rendered when viewing a specific workout. Users can comment on workouts logged by other users.

![Routes](docs/README_gifs/comments.gif)

## Future Directions for the Project

In addition to the features already implemented, I plan to continue work on this project.  The next steps for MapMyCruise are outlined below.

### Privacy Settings

MapMyRun allows users to change the privacy settings on the routes/workouts they created, to either allow friends and global users to view and comment on routes/workouts, or keep them private. On the backend, I intend to implement a field on the `routes` and `workouts` tables to capture the settings at the database level, and re-factor the controller actions to respond to 'GET' requests with the appropriate data based on the settings. On the frontend, I intend to re-factor the edit components to allow users to change the privacy settings.

### Route Search

MapMyRun allows users to search for routes created by other users within a particular geographic area. The results are rendered as markers on a map. I intend to build this new component using the Google Maps Places library to search and pan to specific geographic areas on the map, and Markers object to locate specific routes on the map.

### Route Bookmarking

Hand in hand with the 2 features above, MapMyRun allows a user to bookmark a route they find in the search, based on the route's privacy settings. The user will then be able to log workouts based on the route that has been bookmarked. On the backend, I intend to create a `bookmarks` join table associating `route_id` and `user_id`, as well as the associated create and delete routers and controller actions. On the frontend, I will re-factor the components to view routes to include an option to bookmark, and the components to create/edit workouts to enable users to select bookmarked routes.
