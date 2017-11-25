import {connect} from 'react-redux';
import RouteForm from './route_form';
import {updateRoute, fetchRoute, receiveRouteErrors} from '../../actions/routes_actions';
import {openModal, closeModal} from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  const {session: {currentUser}} = state;
  let route = state.entities.routes.routes_by_id[ownProps.match.params.routeId];
  if (!route) {
    route = {
      name: '',
      polyline: '',
      distance: '',
      city: '',
    };
  }
  return {
    currentUser, 
    modal: state.ui.modal,
    errors: state.errors.routes,
    route: route,
    formType: 'edit',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoute: (routeId) => dispatch(fetchRoute(routeId)),
    action: (route) => dispatch(updateRoute(route)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    receiveRouteErrors: (errors) => dispatch(receiveRouteErrors(errors)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (RouteForm);
