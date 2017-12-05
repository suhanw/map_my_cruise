import * as NotificationsApiUtil from '../util/notifications_api_util';

export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS';
export const RECEIVE_NOTIFICATIONS_ERRORS = 'RECEIVE_NOTIFICATIONS_ERRORS';

export const receiveNotifications = (payload) => {
  return {
    type: RECEIVE_NOTIFICATIONS,
    payload,
  };
};

export const receiveNotificationsErrors = (errors) => {
  return {
    type: RECEIVE_NOTIFICATIONS_ERRORS,
    errors,
  };
};

export const fetchNotifications = () => {
  return (dispatch) => {
    return NotificationsApiUtil.fetchNotifications().then(
      (payload) => dispatch(receiveNotifications(payload)),
      (errors) => dispatch(receiveNotificationsErrors(errors.responseJSON))
    );
  };
};
