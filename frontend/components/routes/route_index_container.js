import {connect} from 'react-redux';
import RouteIndex from './route_index';
import {fetchRoutes} from '../../actions/routes_actions';

const mapStateToProps = ({entities, session}) => {
  return {
    routes: Object.values(entities.routes),
    currentUser: session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoutes: () => dispatch(fetchRoutes()),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (RouteIndex);
