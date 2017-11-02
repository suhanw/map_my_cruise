import {connect} from 'react-redux';
import UserSearch from './user_search';
import {searchUsers, clearResults} from '../../actions/user_search_actions';
import {createFriendStatus,
  fetchFriendStatuses,
  deleteFriendStatus
} from '../../actions/friends_actions';
import {clearErrors} from '../../actions/clear_actions';

const mapStateToProps = ({entities: {friends, users, userSearchResults}, errors: {user_search}, session: {currentUser}}) => {
  return {
    currentUser,
    friends,
    userSearchResults,
    users,
    errors: user_search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsers: (searchTerm) => dispatch(searchUsers(searchTerm)),
    createFriendStatus: (friendStatus) => dispatch(createFriendStatus(friendStatus)),
    fetchFriendStatuses: () => dispatch(fetchFriendStatuses()),
    deleteFriendStatus: (friendStatusId) => dispatch(deleteFriendStatus(friendStatusId)),
    clearResults: () => dispatch(clearResults()),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (UserSearch);
