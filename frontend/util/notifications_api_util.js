export const fetchNotifications = () => {
  return $.ajax({
    url:`api/notifications/`,
    method: 'get',
  });
};

export const updateNotification = (notification) => {
  return $.ajax({
    url: `api/notifications/${notification.id}`,
    method: 'patch',
    data: {notification}
  });
};
