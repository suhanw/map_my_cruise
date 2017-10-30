import {connect} from 'react-redux';
import RouteIndex from './route_index';
import {fetchRoutes, deleteRoute} from '../../actions/routes_actions';
import {closeModal, openModal} from '../../actions/modal_actions';

const mapStateToProps = ({entities, session, ui:{modal}}) => {
  const loading = entities.routes.ordered_ids ? false : true;
  return {
    loading,
    routes: entities.routes,
    currentUser: session.currentUser,
    modal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoutes: () => dispatch(fetchRoutes()),
    deleteRoute: (routeId) => dispatch(deleteRoute(routeId)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (RouteIndex);
