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

### Polymorphic Likes

`likes` are designed with polymorphic associations with `routes` and `workouts` to keep DRY modular code as well as enable scalability for other resources that can be likable in the future.

``` Ruby
# like.rb
class Like < ApplicationRecord
  ...
  belongs_to :likable, polymorphic: true
  ...
end

# route.rb
class Route < ApplicationRecord
  ...
  has_many :likes, as: :likable, dependent: :destroy
  ...
end

# workout.rb
class Workout < ApplicationRecord
  ...
  has_many :likes, as: :likable, dependent: :destroy
  ...
end
```

Routing concern is used to declare common `like` routes for `likables` including `routes` and `workouts`.
```Ruby
# routes.rb
concern :likable do
  resources :likes, only: [:create]
end

resources :routes, only: [:index, :show, :create, :update, :destroy], concerns: [:likable]
resources :workouts, only: [:index, :show, :create, :update, :destroy], concerns: [:likable, :commentable]
```

`likes` are created for the relevant `likable` in the controller
```Ruby
# likes_controller.rb
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

On the front-end, the `LikeIndex` React component is designed to be agnostic of the resource that is `likable`. `LikeIndex` knows what `likable` resource it's related to based on the props passed upon mounting.
```JavaScript
// show_workout.jsx
renderLikes() {
  return (
    <LikeIndex
      fetchLikable={this.props.fetchWorkout}
      likableLikes={this.props.workout.likes}
      likableType="workouts"
      likableId={this.props.workout.id} />
  );
}
```

Based on the props passed in above, it creates dispatch functions for the specific `likable` resource (i.e., either route or workout).
```JavaScript
// like_index.jsx
const mapDispatchToProps = (dispatch, ownProps) => {
  const {fetchLikable, likableType, likableId} = ownProps;
  return {
    createLike: () => dispatch(createLike(likableType, likableId)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
    fetchLikable: () => fetchLikable(likableId),
  };
};

// likes_actions.jsx
export const createLike = (likableType, likableId) => {
  return (dispatch) => {
    return LikeApiUtil.createLike(likableType, likableId).then(
      (newLike) => dispatch(receiveLike(newLike)),
      (errors) => dispatch(receiveLikeErrors(errors.responseJSON))
    );
  };
};
```


### Comments

Comments are associated with `user_id` and `workout_id`. The associated comments are rendered when viewing a specific workout. Users can comment on workouts logged by other users.

![Routes](docs/README_gifs/comments.gif)

### Notifications

Real-time notification is accomplished using the Pusher API and Websocket protocol.
![Routes](docs/README_gifs/notifications.gif)

On the front-end, the `Header` component is subscribed to a channel that listens for notification events. Upon a notification event, it dispatches an AJAX request to fetch new notifications.
```JavaScript
// header.jsx
renderNotifications() {
  ...
  let channel = this.pusher.subscribe(`user_${this.props.currentUser.id}`);
  channel.bind('notification_event', (data)=>{
    this.props.fetchNotifications();
  });
  ...
}
```

On the back-end, the `notification` model publishes a notification event to the channel to which the `Header` component is subscribed, whenever a new notification instance is created.
```Ruby
# notification.rb
class Notification < ApplicationRecord
  after_create :trigger_push_event
  belongs_to :notifiable, polymorphic: true

  ...

  private
  def trigger_push_event
    # create Pusher channel specific to resource owner
    owner_channel = "user_#{self.user_id}"
    Pusher.trigger(owner_channel, 'notification_event', {
      message: "this is #{self.user.email}'s #{self.notifiable_type} notification"
    })
  end
end
```

`notifications` have polymorphic associations to `notifiable` resources like `comments` and `likes`.
```Ruby
# comment.rb
class Comment < ApplicationRecord
  ...
  has_one :notification, as: :notifiable, dependent: :destroy
  ...
end

# like.rb
class Like < ApplicationRecord
  ...
  has_one :notification, as: :notifiable, dependent: :destroy
  ...
end
```
The associated `notification` is created when the `notifiable` resource (e.g., `like`) is created by the controller.
```Ruby
# likes_controller.rb
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
end
```

## Future Directions for the Project

In addition to the features already implemented, I plan to continue work on this project.  The next steps for MapMyCruise are outlined below.

### Privacy Settings

MapMyRun allows users to change the privacy settings on the routes/workouts they created, to either allow friends and global users to view and comment on routes/workouts, or keep them private. On the backend, I intend to implement a field on the `routes` and `workouts` tables to capture the settings at the database level, and re-factor the controller actions to respond to 'GET' requests with the appropriate data based on the settings. On the frontend, I intend to re-factor the edit components to allow users to change the privacy settings.

### Route Search

MapMyRun allows users to search for routes created by other users within a particular geographic area. The results are rendered as markers on a map. I intend to build this new component using the Google Maps Places library to search and pan to specific geographic areas on the map, and Markers object to locate specific routes on the map.

### Route Bookmarking

Hand in hand with the 2 features above, MapMyRun allows a user to bookmark a route they find in the search, based on the route's privacy settings. The user will then be able to log workouts based on the route that has been bookmarked. On the backend, I intend to create a `bookmarks` join table associating `route_id` and `user_id`, as well as the associated create and delete routers and controller actions. On the frontend, I will re-factor the components to view routes to include an option to bookmark, and the components to create/edit workouts to enable users to select bookmarked routes.
