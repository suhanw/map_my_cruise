import {connect} from 'react-redux';
import ShowRoute from './show_route';
import {fetchRoute, deleteRoute} from '../../actions/routes_actions';

const mapStateToProps = ({entities, errors}, ownProps) => {
  const routeId = ownProps.match.params.routeId;
  let loading = true;
  let route = entities.routes.routes_by_id[routeId];
  let user;

  if (route) {
    user = entities.users[route.user_id];
    if (user) {
      loading = false;
    }
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
