import * as ActivitiesApiUtil from '../util/activities_api_util';

export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';
export const RECEIVE_ACTIVITIES_ERRORS = 'RECEIVE_ACTIVITIES_ERRORS';

export const receiveActivities = (payload) => {
  let normalizedPayload = payload;
  return {
    type: RECEIVE_ACTIVITIES,
    payload: normalizedPayload
  };
};

export const receiveActivitiesErrors = (errors) => {
  return {
    type: RECEIVE_ACTIVITIES_ERRORS,
    errors,
  };
};

export const fetchActivities = () => {
  return (dispatch) => {
    return ActivitiesApiUtil.fetchActivities().then(
      (payload) => dispatch(receiveActivities(payload)),
      (errors) => dispatch(receiveActivitiesErrors(errors.responseJSON))
    );
  };
};
