export const fetchActivities = () => {
  return $.ajax({
    url:'api/activities/',
    method: 'get',
  });
};
