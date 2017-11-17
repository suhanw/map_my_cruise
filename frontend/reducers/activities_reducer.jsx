import merge from 'lodash/merge';
import {RECEIVE_ACTIVITIES} from '../actions/activities_actions';
import {CLEAR_ENTITIES} from '../actions/clear_actions';

const defaultState = {
  activities_by_id: {},
  ordered_ids: [],
};

const ActivitiesReducer = (state=defaultState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
    const {activities_by_id, ordered_ids} = action.payload;
      newState = merge({}, state, {
        activities_by_id,
        ordered_ids,
      });
      return newState;

    case CLEAR_ENTITIES:
      return {};

    default:
      return state;
  }
};

export default ActivitiesReducer;
