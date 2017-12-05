import {combineReducers} from 'redux';
import RoutesReducer from './routes/routes_reducer';
import UsersReducer from './users_reducer';
import WorkoutsReducer from './workouts/workouts_reducer';
import CommentsReducer from './comments/comments_reducer';
import FriendsReducer from './friends/friends_reducer';
import UserSearchResultsReducer from './friends/user_search_results_reducer';
import ActivitiesReducer from './activities/activities_reducer';
import NotificationsReducer from './notifications/notifications_reducer';

const EntitiesReducer = combineReducers({
  notifications: NotificationsReducer,
  activities: ActivitiesReducer,
  routes: RoutesReducer,
  workouts: WorkoutsReducer,
  users: UsersReducer,
  comments: CommentsReducer,
  friends: FriendsReducer,
  userSearchResults: UserSearchResultsReducer,
});

export default EntitiesReducer;
