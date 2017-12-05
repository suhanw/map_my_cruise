import {
  RECEIVE_NOTIFICATIONS,
  RECEIVE_NOTIFICATIONS_ERRORS
} from '../../actions/notifications_actions';
import {CLEAR_ERRORS} from '../../actions/clear_actions';

const defaultState = [];

const NotificationErrorsReducer = (state=defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NOTIFICATIONS_ERRORS:
      return action.errors;

    case RECEIVE_NOTIFICATIONS:
      return [];

    case CLEAR_ERRORS:
      return [];

    default:
      return state;
  }
};

export default NotificationErrorsReducer;
