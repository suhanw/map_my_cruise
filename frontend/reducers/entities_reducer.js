import {combineReducers} from 'redux';
import RoutesReducer from './routes_reducer';
import UsersReducer from './users_reducer';
import WorkoutsReducer from './workouts_reducer';
import CommentsReducer from './comments_reducer';
import FriendsReducer from './friends_reducer';

const EntitiesReducer = combineReducers({
  routes: RoutesReducer,
  workouts: WorkoutsReducer,
  users: UsersReducer,
  comments: CommentsReducer,
  friends: FriendsReducer,
});

export default EntitiesReducer;
