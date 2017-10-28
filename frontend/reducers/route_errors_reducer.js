import {
  RECEIVE_ROUTES,
  RECEIVE_ROUTE,
  REMOVE_ROUTE,
  RECEIVE_ROUTE_ERRORS,
} from '../actions/routes_actions';
import {CLEAR_ERRORS} from '../actions/clear_actions';



const defaultState = [];

const RouteErrorsReducer = (state=defaultState, action)=>{
  Object.freeze(state);
  switch (action.type) {

    case RECEIVE_ROUTE_ERRORS:
      return action.errors;

    case RECEIVE_ROUTE:
      return [];

    case CLEAR_ERRORS:
      return [];

    default:
      return state;
  }
};

export default RouteErrorsReducer;
