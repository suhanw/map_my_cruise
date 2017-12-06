import merge from 'lodash/merge';
import {RECEIVE_NOTIFICATIONS} from '../../actions/notifications_actions';
import {REMOVE_COMMENT} from '../../actions/comments_actions';
import {CLEAR_ENTITIES} from '../../actions/clear_actions';

const defaultState = {
  notifications_by_id: {},
  ordered_ids: [],
  unread_count: 0,
};

const NotificationsReducer = (state=defaultState, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NOTIFICATIONS:
      return action.payload;

    // case REMOVE_COMMENT:
    //   newState = merge({}, state);
    //   delete newState.notifications_by_id[action.commentId];

    case CLEAR_ENTITIES:
      return defaultState;

    default:
      return state;
  }
};

export default NotificationsReducer;
