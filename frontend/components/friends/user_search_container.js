import {connect} from 'react-redux';
import UserSearch from './user_search';
import {searchUsers} from '../../actions/user_search_actions';
import {createFriendStatus, fetchFriendStatuses} from '../../actions/friends_actions';

const mapStateToProps = ({entities: {users, userSearchResults}, session: {currentUser}}) => {
  return {
    currentUser,
    userSearchResults,
    users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsers: (searchTerm) => dispatch(searchUsers(searchTerm)),
    createFriendStatus: (friendStatus) => dispatch(createFriendStatus(friendStatus)),
    fetchFriendStatuses: () => dispatch(fetchFriendStatuses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
