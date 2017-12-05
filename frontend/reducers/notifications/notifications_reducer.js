import merge from 'lodash/merge';
import {RECEIVE_NOTIFICATIONS} from '../../actions/notifications_actions';
import {CLEAR_ENTITIES} from '../../actions/clear_actions';

const defaultState = {
  notifications_by_id: {},
  ordered_ids: [],
};

const NotificationsReducer = (state=defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NOTIFICATIONS:
      return action.payload;

    case CLEAR_ENTITIES:
      return defaultState;

    default:
      return state;
  }
};

export default NotificationsReducer;
