import {connect} from 'react-redux';
import ShowRoute from './show_route';
import {fetchRoutes} from '../../actions/routes_actions';

const mapStateToProps = ({entities, errors}, ownProps) => {
  const routeId = ownProps.match.params.routeId;
  const loading = entities.routes[routeId] ? false : true;
  return {
    route: entities.routes[routeId],
    errors: errors.routes,
    loading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const routeId = ownProps.match.params.routeId;
  return {
    fetchRoute: (rteId) => dispatch(fetchRoute(rteId)),
    deleteRoute: (rteId) => dispatch(fetchRoutes(rteId)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (ShowRoute);
