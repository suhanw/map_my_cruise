import {combineReducers} from 'redux';
import RoutesReducer from './routes/routes_reducer';
import UsersReducer from './users_reducer';
import WorkoutsReducer from './workouts/workouts_reducer';
import CommentsReducer from './comments_reducer';
import FriendsReducer from './friends_reducer';
import UserSearchResultsReducer from './user_search_results_reducer';
import ActivitiesReducer from './activities_reducer';

const EntitiesReducer = combineReducers({
  activities: ActivitiesReducer,
  routes: RoutesReducer,
  workouts: WorkoutsReducer,
  users: UsersReducer,
  comments: CommentsReducer,
  friends: FriendsReducer,
  userSearchResults: UserSearchResultsReducer,
});

export default EntitiesReducer;
