import {connect} from 'react-redux';
import ProfileForm from './profile_form';
import {editProfile} from '../actions/session_actions';


const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (formData)=> dispatch(editProfile(formData)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (ProfileForm);
