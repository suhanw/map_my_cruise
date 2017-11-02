import React from 'react';
import {Link} from 'react-router-dom';

class FriendIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.renderFriendOptions = this.renderFriendOptions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { user, friendType, friendStatus } = this.props;

    return (
      <li className="friend-box">
        <img src={user.avatar_url} className="friend-avatar" />
        <span>
          {`${user.fname} ${user.lname}`}
        </span>
        {this.renderFriendOptions(friendType, friendStatus)}
      </li>
    );
  }

  renderFriendOptions(friendType, friendStatus) {
    let friendOptions;

    if (friendType === "actual") {
      friendOptions = (
        <div className="friend-options">
          <button
            onClick={this.handleClick(friendStatus.id)}>
            Unfriend
          </button>
        </div>
      );
    } else if (friendType === "request") {
      friendOptions = (
        <div className="friend-options">
          <button className="blue-button"
            onClick={this.handleClick(friendStatus.id)}>
            CANCEL
          </button>
        </div>
      );
    } else if (friendType === 'receipt') {
      // define 'data' body for AJAX request
      const acceptFriendStatus = {
        id: friendStatus.id,
        friend_status: 'yes',
      };
      const denyFriendStatus = {
        id: friendStatus.id,
        friend_status: 'no',
      };

      friendOptions = (
        <div className="friend-options">
          <button className="orange-button"
            onClick={this.handleClick(acceptFriendStatus)}>
            ACCEPT
          </button>
          <button className="blue-button"
            onClick={this.handleClick(denyFriendStatus)}>
            DENY
          </button>
        </div>
      );
    } else { // for user search results
      friendOptions = (
        <div className="friend-options">
          <button className="blue-button">
            ADD
          </button>
        </div>
      );
    }

    return friendOptions;
  }

  handleClick(arg) {
    const {action, fetchFriendStatuses} = this.props;
    // arg can be either friendStatus POJO, or friendStatusID
    return () => {
      action(arg).then(()=>{
        fetchFriendStatuses();
      });
    };
  }
}

export default FriendIndexItem;
