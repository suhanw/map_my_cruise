import React from 'react';
import {Link} from 'react-router-dom';
import FriendIndexItem from './friend_index_item';
import Spinner from '../spinner';

class FriendIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.isPendingFriendRequest = this.isPendingFriendRequest.bind(this);
    this.renderFriends = this.renderFriends.bind(this);
    this.renderThumbnails = this.renderThumbnails.bind(this);
  }

  componentDidMount() {
    this.props.fetchFriendStatuses().then(
      ()=>{
        this.setState({loading: false});
      }
    );
  }

  renderThumbnails() {
    if (this.state.loading) {
      return (
        <section className="activity-feed-friends-thumbnails">
          <ul>
            <li>
              <small>Loading...</small>
            </li>
          </ul>
        </section>
      );
    }

    return (
      <section className="activity-feed-friends-thumbnails">
        {this.renderFriends(this.props.thumbnail)}
        <ul>
          {this.actualFriends}
        </ul>
      </section>
    );
  }

  render() {
    if (this.props.thumbnail) {
      return this.renderThumbnails();
    }

    if (this.state.loading) {
      return (
        <section className="friend-index">
          <div className="spinnerBox">
            <Spinner />
          </div>
        </section>
      );
    }

    if (!this.props.currentUser.friends.length) {
      return (
        <section className="friend-index">
          <span className="message">
            I'm sorry you have no friends.
            Click <Link to="/friends/find">here</Link> to make an attempt at friendship.
          </span>
          <img src="https://media.giphy.com/media/XAhGDQXrvm2qc/giphy.gif" className="gif"/>
        </section>
      );
    }

    this.renderFriends(this.props.thumbnail); //this updates instance variables that categorize the friends

    return (
      <section className="friend-index">

        {this.actualFriends.length ?
          (
            <section className="friends">
              <h3>FRIENDS</h3>
              <ul>
                {this.actualFriends}
              </ul>
            </section>
          ) :
          null}


        {this.pendingFriendReceipts.length ?
          (
            <section className="pending-friend-receipts">
              <h3>FRIEND REQUESTS</h3>
              <ul>
                {this.pendingFriendReceipts}
              </ul>
            </section>
          ) :
          null }
      </section>
    );
  }

  renderFriends(thumbnail) {
    const { friends, users, deleteFriendStatus, updateFriendStatus } = this.props;

    let actualFriends = [];
    let pendingFriendRequests = [];
    let pendingFriendReceipts = [];

    this.props.currentUser.friends.forEach((friendStatusId)=>{

      let friendStatus = friends[friendStatusId];
      let friendUserId = friendStatus.friend;
      let friendUser = users[friendUserId];

      if (this.isActualFriend(friendStatus)) {
        // this is an existing friend
        actualFriends.push(
          <FriendIndexItem key={friendUser.id}
            thumbnail={thumbnail}
            user={friendUser}
            friendStatus={friendStatus}
            friendType="actual"
            action={deleteFriendStatus}
            fetchFriendStatuses={this.props.fetchFriendStatuses} />
        );
      } else if (this.isPendingFriendRequest(friendStatus)) {
        // to check if current user is the person who made the friend request
        pendingFriendRequests.push(
          <FriendIndexItem key={friendUser.id}
            thumbnail={thumbnail}
            user={friendUser}
            friendStatus={friendStatus}
            friendType="request"
            action={deleteFriendStatus}
            fetchFriendStatuses={this.props.fetchFriendStatuses} />
        );
      } else {
        // else, the current user received this friend request
        pendingFriendReceipts.push(
          <FriendIndexItem key={friendUser.id}
            thumbnail={thumbnail}
            user={friendUser}
            friendStatus={friendStatus}
            friendType="receipt"
            action={updateFriendStatus}
            fetchFriendStatuses={this.props.fetchFriendStatuses} />
        );
      }
    });

    this.actualFriends = actualFriends;
    this.pendingFriendRequests = pendingFriendRequests;
    this.pendingFriendReceipts = pendingFriendReceipts;
  }

  isActualFriend(friend){
    return friend.friend_status === 'yes';
  }

  isPendingFriendRequest(friend) {
    const { currentUser } = this.props;
    return friend.friender_id === currentUser.id;
  }
}

export default FriendIndex;

// to render pending friend requests
// {this.pendingFriendRequests.length ?
//   (
// <section className="pending-friend-requests">
//       <h3>PENDING FRIEND REQUESTS</h3>
//       <ul>
//         {this.pendingFriendRequests}
//       </ul>
// </section>
// ) : null }
