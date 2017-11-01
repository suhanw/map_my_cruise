import {connect} from 'react-redux';
import FriendIndex from './friend_index';
import {fetchFriendStatuses} from '../../actions/friends_actions';

const mapStateToProps = ({entities: {friends, users}, session: {currentUser}}) => {
  return {
    currentUser,
    friends,
    users,
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    fetchFriendStatuses: () => dispatch(fetchFriendStatuses()),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (FriendIndex);
