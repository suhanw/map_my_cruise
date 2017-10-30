import * as RouteApiUtil from '../util/routes_api_util';

export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const REMOVE_ROUTE = 'REMOVE_ROUTE';
export const RECEIVE_ROUTE_ERRORS = 'RECEIVE_ROUTE_ERRORS';

export const receiveRoutes = (routes) => {
  return {
    type: RECEIVE_ROUTES,
    routes
  };
};

export const receiveRoute = (payload) => {
  return {
    type: RECEIVE_ROUTE,
    payload
  };
};

export const removeRoute = (route) => {
  return {
    type: REMOVE_ROUTE,
    route
  };
};

export const receiveRouteErrors = (errors) => {
  return {
    type: RECEIVE_ROUTE_ERRORS,
    errors
  };
};

export const fetchRoutes = () => {
  return (dispatch) => {
    return RouteApiUtil.fetchRoutes().then(
      (routes) => dispatch(receiveRoutes(routes)),
      (errors) => dispatch(receiveRouteErrors(errors.responseJSON))
    );
  };
};

export const fetchRoute = (routeId) => {
  return (dispatch) => {
    return RouteApiUtil.fetchRoute(routeId).then(
      (payload) => dispatch(receiveRoute(payload)),
      (errors) => dispatch(receiveRouteErrors(errors.responseJSON))
    );
  };
};

export const createRoute = (route) => {
  return (dispatch) => {
    return RouteApiUtil.createRoute(route).then(
      (newRoute) => dispatch(receiveRoute(newRoute)),
      (errors) => dispatch(receiveRouteErrors(errors.responseJSON))
    );
  };
};

export const updateRoute = (route) => {
  return (dispatch) => {
    return RouteApiUtil.updateRoute(route).then(
      (updatedRoute) => dispatch(receiveRoute(updatedRoute)),
      (errors) => dispatch(receiveRouteErrors(errors.responseJSON))
    );
  };
};

export const deleteRoute = (routeId) => {
  return (dispatch) => {
    return RouteApiUtil.deleteRoute(routeId).then(
      (deletedRoute) => dispatch(removeRoute(deletedRoute)),
      (errors) => dispatch(receiveRouteErrors(errors.responseJSON))
    );
  };
};
