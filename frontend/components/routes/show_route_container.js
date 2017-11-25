import {connect} from 'react-redux';
import ShowRoute from './show_route';
import {fetchRoute, deleteRoute} from '../../actions/routes_actions';

const mapStateToProps = ({entities, errors, session}, ownProps) => {
  const routeId = ownProps.match.params.routeId;
  const {currentUser} = session;
  let loading = true;
  let route;
  let user;

  if (entities.routes.routes_by_id) {
    route = entities.routes.routes_by_id[routeId];
  }

  if (route) {
    user = entities.users[route.user];
    if (user) {
      loading = false;
    }
  }

  return {
    currentUser,
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
