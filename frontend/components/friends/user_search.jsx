import React from 'react';
import Spinner from '../spinner';
import FriendIndexItem from './friend_index_item';

class UserSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      loadingSearchResults: false,
      loadingPendingRequests: true,
      errors: this.props.errors,
    };

    this.renderUserSearchResults = this.renderUserSearchResults.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPendingFriendRequests = this.renderPendingFriendRequests.bind(this);
  }

  componentDidMount() {
    this.props.fetchFriendStatuses().then(
      ()=>{
        this.setState({loadingPendingRequests: false});
      }
    );
  }

  componentWillReceiveProps(newProps) {
    this.setState({errors: newProps.errors});

  }

  componentWillMount() {
    this.props.clearResults();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render(){

    let errorDom = null;

    if (this.state.errors.length) {
      let errorDomItems = this.state.errors.map((error, i)=>{
        return (
          <li key={i}>{error}</li>
        );
      });

      errorDom = (
        <ul className="errors">
          {errorDomItems}
        </ul>
      );
    }

    return (
      <section className="user-search" onSubmit={this.handleSubmit}>
        <h3>Find friends by email, first name, or last name:</h3>
        <form className="user-search-form">
          <input type="text"
            className="input-text"
            onChange={this.handleChange} />
          <button type="submit"
            className="orange-button">SEARCH</button>
        </form>
        {errorDom}

        {this.renderPendingFriendRequests()}

        <section className="user-search-results">
          {this.renderUserSearchResults()}
        </section>

        {this.pendingFriendRequests.length ?
          (
            <section className="pending-friend-requests">
              <h3>PENDING FRIEND REQUESTS</h3>
              <ul>
                {this.pendingFriendRequests}
              </ul>
            </section>
          ) :
          null}
      </section>
    );
  }

  renderPendingFriendRequests() {
    if (this.state.loadingPendingRequests) {
      this.pendingFriendRequests = (
        <div className="spinner-box">
          <Spinner />
        </div>
      );
      return;
    }

    const { friends, users, deleteFriendStatus, fetchFriendStatuses } = this.props;

    let pendingFriendRequests = [];

    this.props.currentUser.friends.forEach((friendStatusId)=>{

      let friendStatus = friends[friendStatusId];
      let friendUserId = friendStatus.friend;
      let friendUser = users[friendUserId];

      if (this.isPendingFriendRequest(friendStatus)) {
        // to check if current user is the person who made the friend request
        pendingFriendRequests.push(
          <FriendIndexItem key={friendUser.id}
            user={friendUser}
            friendStatus={friendStatus}
            friendType="request"
            action={deleteFriendStatus}
            fetchFriendStatuses={fetchFriendStatuses} />
        );
      }

    });
    this.pendingFriendRequests = pendingFriendRequests;
  }

  isPendingFriendRequest(friend) {
    const { currentUser } = this.props;
    return friend.friender_id === currentUser.id && friend.friend_status === 'pending';
  }

  renderUserSearchResults() {
    const {
      userSearchResults,
      users,
      friends,
      createFriendStatus,
      fetchFriendStatuses
    } = this.props;

    if (this.state.loadingSearchResults) {
      return (
        <div className="spinner-box">
          <Spinner />
        </div>
      );
    }

    let userSearchResultsDom = userSearchResults.map((userId) => {
      const friendStatus = { friendee_id: userId }; //all you need to make friend request
      return (
        <FriendIndexItem key={userId}
          user={users[userId]}
          friendStatus={friendStatus}
          friendType="userSearchResult"
          action={createFriendStatus}
          fetchFriendStatuses={fetchFriendStatuses} />
      );
    });

    userSearchResultsDom = (
      <ul>
        {userSearchResultsDom}
      </ul>
    );

    return userSearchResultsDom;

  }


  handleChange(e) {
    this.setState({searchTerm: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({loadingSearchResults: true});
    this.props.searchUsers(this.state.searchTerm).then(
      () => {
        this.setState({loadingSearchResults: false});
      },
      () => {
        this.setState({loadingSearchResults: false});
      }
    );
  }
}

export default UserSearch;
