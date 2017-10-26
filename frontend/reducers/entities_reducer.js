import {combineReducers} from 'redux';
import RoutesReducer from './routes_reducer';

const EntitiesReducer = combineReducers({
  routes: RoutesReducer,
});

export default EntitiesReducer;
