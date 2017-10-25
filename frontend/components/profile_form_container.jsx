import {connect} from 'react-redux';
import ProfileForm from './profile_form';


const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    to_update: ()=>{},
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (ProfileForm);
