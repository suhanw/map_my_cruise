import {connect} from 'react-redux';
import SessionForm from './session_form';
import {signup, login} from '../actions/session_actions';
import {clearErrors} from '../actions/clear_errors_action';

const mapStateToProps = (state, ownProps) => {
  let formType = (ownProps.match.path === '/login') ? 'login' : 'signup';

  return {
    formType,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let action = (ownProps.match.path === '/login') ? login : signup;

  return {
    submitForm: (user) => dispatch(action(user)),
    clearErrors: () => dispatch(clearErrors()),
    // for demo login
    login: (user) => dispatch(login(user)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (SessionForm);
