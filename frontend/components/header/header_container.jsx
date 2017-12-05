import {connect} from 'react-redux';
import Header from './header';
import {logout} from '../../actions/session_actions';
import {fetchNotifications} from '../../actions/notifications_actions';

const mapStateToProps = (state) => {
  const {session:{currentUser}, entities: {notifications}} = state;
  return {
    currentUser,
    notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchNotifications: () => dispatch(fetchNotifications()),
  };
};


export default connect
  (mapStateToProps, mapDispatchToProps)
  (Header);
