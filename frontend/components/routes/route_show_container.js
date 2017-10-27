import {connect} from 'react-redux';
import RouteShow from './route_show';
import {fetchRoutes} from '../../actions/routes_actions';

const mapStateToProps = ({entities}, ownProps) => {
  const routeId = ownProps.match.params.routeId;
  const loading = entities.routes[routeId] ? false : true;
  return {
    route: entities.routes[routeId],
    loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const routeId = ownProps.match.params.routeId;
  return {
    fetchRoute: (rteId) => dispatch(fetchRoutes(rteId)),
    deleteRoute: (rteId) => dispatch(fetchRoutes(rteId)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (RouteShow);
