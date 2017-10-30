import {combineReducers} from 'redux';
import RoutesReducer from './routes_reducer';
import UsersReducer from './users_reducer';
import WorkoutsReducer from './workouts_reducer';

const EntitiesReducer = combineReducers({
  routes: RoutesReducer,
  workouts: WorkoutsReducer,
  users: UsersReducer,
});

export default EntitiesReducer;
