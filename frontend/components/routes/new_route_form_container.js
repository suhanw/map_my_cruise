import {connect} from 'react-redux';
import RouteForm from './route_form';
import {createRoute, receiveRouteErrors} from '../../actions/routes_actions';
import {openModal, closeModal} from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps)=>{
  let route = {
    name: '',
    polyline: '',
    distance: '',
    city: '',
  };
  return {
    modal: state.ui.modal,
    errors: state.errors.routes,
    route: route,
    formType: 'new',
  };
};

const mapDispatchToProps = (dispatch)=>{
  return {
    action: (route) => dispatch(createRoute(route)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    receiveRouteErrors: (errors) => dispatch(receiveRouteErrors(errors)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (RouteForm);
