import {combineReducers} from 'redux';
import RoutesReducer from './routes_reducer';
import UsersReducer from './users_reducer';

const EntitiesReducer = combineReducers({
  routes: RoutesReducer,
  users: UsersReducer
});

export default EntitiesReducer;
