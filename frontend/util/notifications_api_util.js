export const fetchNotifications = () => {
  return $.ajax({
    url:`api/notifications/`,
    method: 'get',
  });
};
