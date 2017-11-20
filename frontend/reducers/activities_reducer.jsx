import merge from 'lodash/merge';
import {RECEIVE_ACTIVITIES} from '../actions/activities_actions';
import {CLEAR_ENTITIES} from '../actions/clear_actions';
import {REMOVE_ROUTE} from '../actions/routes_actions';
import {REMOVE_WORKOUT} from '../actions/workouts_actions';

const defaultState = {
  activities_by_id: {},
  ordered_ids: [],
};

const ActivitiesReducer = (state=defaultState, action) => {
  let newState;
  let new_ordered_ids;
  let activity_id;
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      const {activities_by_id, ordered_ids} = action.payload;
      new_ordered_ids = state.ordered_ids.concat(ordered_ids);
      let set = new Set(new_ordered_ids);
      new_ordered_ids = Array.from(set);
      newState = merge({}, state, {
        activities_by_id,
        ordered_ids: new_ordered_ids,
      });
      return newState;

    case REMOVE_ROUTE:
      activity_id = action.payload.route.activity_id;
      new_ordered_ids = state.ordered_ids.slice(0);
      new_ordered_ids.splice(new_ordered_ids.indexOf(activity_id), 1); //splice is mutative
      newState = merge({}, state);
      newState.ordered_ids = new_ordered_ids; // replace the ordered_ids array in state
      return newState;

    case REMOVE_WORKOUT:
      activity_id = action.payload.workout.activity_id;
      new_ordered_ids = state.ordered_ids.slice(0);
      new_ordered_ids.splice(new_ordered_ids.indexOf(activity_id), 1); //splice is mutative
      newState = merge({}, state);
      newState.ordered_ids = new_ordered_ids; // replace the ordered_ids array in state
      return newState;

    case CLEAR_ENTITIES:
      return {};

    default:
      return state;
  }
};

export default ActivitiesReducer;
