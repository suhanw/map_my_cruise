import {connect} from 'react-redux';
import UserSearch from './user_search';
import {searchUsers} from '../../actions/user_search_actions';
import {createFriendStatus,
  fetchFriendStatuses,
  deleteFriendStatus
} from '../../actions/friends_actions';

const mapStateToProps = ({entities: {friends, users, userSearchResults}, session: {currentUser}}) => {
  return {
    currentUser,
    friends,
    userSearchResults,
    users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsers: (searchTerm) => dispatch(searchUsers(searchTerm)),
    createFriendStatus: (friendStatus) => dispatch(createFriendStatus(friendStatus)),
    fetchFriendStatuses: () => dispatch(fetchFriendStatuses()),
    deleteFriendStatus: (friendStatusId) => dispatch(deleteFriendStatus(friendStatusId)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (UserSearch);
