import {connect} from 'react-redux';
import ProfileForm from './profile_form';
import {editProfile} from '../actions/session_actions';
import {openModal, closeModal} from '../actions/modal_actions';

const mapStateToProps = ({session:{currentUser}, errors: {session}, ui:{modal}}) => {
  return {
    currentUser,
    errors: session,
    modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (formData)=> dispatch(editProfile(formData)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (ProfileForm);
