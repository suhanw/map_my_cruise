import {
  RECEIVE_ACTIVITIES,
  RECEIVE_ACTIVITIES_ERRORS
} from '../actions/activities_actions';
import {CLEAR_ERRORS} from '../actions/clear_actions';

const defaultState = [];

const ActivityErrorsReducer = (state=defaultState, action)=>{
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ACTIVITIES_ERRORS:
      return action.errors;

    case RECEIVE_ACTIVITIES:
      return [];

    case CLEAR_ERRORS:
      return [];

    default:
      return state;
  }
};

export default ActivityErrorsReducer;
