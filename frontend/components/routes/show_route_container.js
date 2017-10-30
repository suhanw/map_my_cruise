import {connect} from 'react-redux';
import ShowRoute from './show_route';
import {fetchRoute, deleteRoute} from '../../actions/routes_actions';

const mapStateToProps = ({entities, errors}, ownProps) => {
  const routeId = ownProps.match.params.routeId;
  let loading;
  let route;
  let user;

  if (entities.routes[routeId]) {
    loading = false;
    route = entities.routes[routeId];
    user = entities.users[entities.routes[routeId].user_id];
  } else {
    loading = true;
  }

  return {
    route,
    user,
    errors: errors.routes,
    loading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const routeId = ownProps.match.params.routeId;
  return {
    fetchRoute: (rteId) => dispatch(fetchRoute(rteId)),
    deleteRoute: (rteId) => dispatch(deleteRoute(rteId)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (ShowRoute);
