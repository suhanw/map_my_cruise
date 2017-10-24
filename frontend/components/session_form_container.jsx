import {connect} from 'react-redux';
import SessionForm from './session_form';
import {signup, login} from '../actions/session_actions';

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
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (SessionForm);
