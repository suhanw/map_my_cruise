import merge from 'lodash/merge';
import {RECEIVE_ACTIVITIES} from '../actions/activities_actions';
import {CLEAR_ENTITIES} from '../actions/clear_actions';
import {REMOVE_ROUTE} from '../actions/routes_actions';

const defaultState = {
  activities_by_id: {},
  ordered_ids: [],
};

const ActivitiesReducer = (state=defaultState, action) => {
  let newState;
  let new_ordered_ids;
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      const {activities_by_id, ordered_ids} = action.payload;
      new_ordered_ids = state.ordered_ids.concat(ordered_ids);
      // debugger
      let set = new Set(new_ordered_ids);
      new_ordered_ids = Array.from(set);
      newState = merge({}, state, {
        activities_by_id,
        ordered_ids: new_ordered_ids,
      });
      return newState;

    case REMOVE_ROUTE:
      const {activity_id} = action.payload.route;
      new_ordered_ids = state.ordered_ids;
      new_ordered_ids = new_ordered_ids.splice(state.ordered_ids.indexOf(activity_id), 1);
      newState = merge({}, state);
      newState.ordered_ids = new_ordered_ids; // replace the ordered_ids array in state
      debugger
      return newState;

    case CLEAR_ENTITIES:
      return {};

    default:
      return state;
  }
};

export default ActivitiesReducer;
