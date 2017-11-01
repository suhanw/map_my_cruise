import {connect} from 'react-redux';
import FriendIndex from './friend_index';
import {
  fetchFriendStatuses,
  deleteFriendStatus,
  updateFriendStatus
} from '../../actions/friends_actions';

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
    deleteFriendStatus: (friendStatusId) => dispatch(deleteFriendStatus(friendStatusId)),
    updateFriendStatus: (friendStatus) => dispatch(updateFriendStatus(friendStatus)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (FriendIndex);
