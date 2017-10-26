export const fetchRoutes = () => {
  return $.ajax({
    url:'api/routes/',
    method: 'get',
  });
};

export const fetchRoute = (routeId) => {
  return $.ajax({
    url:`api/routes/${routeId}`,
    method:'get'
  });
};

export const createRoute = (route) => {
  return $.ajax({
    url:`api/routes/`,
    method: 'post',
    data: {route}
  });
};

export const updateRoute = (route) => {
  return $.ajax({
    url:`api/routes/${route.id}`,
    method: 'patch',
    data: {route}
  });
};

export const deleteRoute = (routeId) => {
  return $.ajax({
    url:`api/routes/${routeId}`,
    method:'delete'
  });
};
