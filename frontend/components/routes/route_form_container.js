import {connect} from 'react-redux';
import RouteForm from './route_form';
import {createRoute} from '../../actions/routes_actions';
import {openModal, closeModal} from '../../actions/modal_actions';

const mapStateToProps = (state)=>{
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch)=>{
  return {
    createRoute: (route) => dispatch(createRoute(route)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (RouteForm);
  // (mapStateToProps, mapDispatchToProps)
