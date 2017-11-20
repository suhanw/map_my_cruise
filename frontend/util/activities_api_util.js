export const fetchActivities = (offset) => {
  return $.ajax({
    url:`api/activities/`,
    method: 'get',
    data: {
      offset,
    }
  });
};
