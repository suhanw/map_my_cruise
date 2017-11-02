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
  }

  componentDidMount() {
    this.props.fetchFriendStatuses().then(
      ()=>{
        this.setState({loading: false});
      }
    );
  }

  render() {
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
          I'm sorry you have no friends.
        </section>
      );
    }

    this.renderFriends(); //this updates instance variables that categorize the friends

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

        {this.pendingFriendRequests.length ?
          (
        <section className="pending-friend-requests">
              <h3>PENDING FRIEND REQUESTS</h3>
              <ul>
                {this.pendingFriendRequests}
              </ul>
        </section>
        ) : null }

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

  renderFriends() {
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
            user={friendUser}
            friendStatus={friendStatus}
            friendType="actual"
            action={deleteFriendStatus}
            fetchFriendStatuses={fetchFriendStatuses} />
        );
      } else if (this.isPendingFriendRequest(friendStatus)) {
        // to check if current user is the person who made the friend request
        pendingFriendRequests.push(
          <FriendIndexItem key={friendUser.id}
            user={friendUser}
            friendStatus={friendStatus}
            friendType="request"
            action={deleteFriendStatus}
            fetchFriendStatuses={fetchFriendStatuses} />
        );
      } else {
        // else, the current user received this friend request
        pendingFriendReceipts.push(
          <FriendIndexItem key={friendUser.id}
            user={friendUser}
            friendStatus={friendStatus}
            friendType="receipt"
            action={updateFriendStatus}
            fetchFriendStatuses={fetchFriendStatuses} />
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
