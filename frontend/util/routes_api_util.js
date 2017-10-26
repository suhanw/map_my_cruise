export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';

export const receiveRoutes = (routes) => {
  return {
    type: RECEIVE_ROUTES,
    routes
  };
};

export const receiveRoute = (route) => {
  return {
    type: RECEIVE_ROUTE,
    route
  };
};

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
  debugger
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
