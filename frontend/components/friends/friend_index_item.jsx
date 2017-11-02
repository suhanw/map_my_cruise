import React from 'react';
import {Link} from 'react-router-dom';

class FriendIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendType: this.props.friendType,
    };

    this.renderFriendOptions = this.renderFriendOptions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { user, friendStatus } = this.props;
    const { friendType } = this.state;
    let cssClass = "friend-box";

    if (friendType === 'userSearchResult' || friendType === 'added') {
      cssClass = "search-result-box";
    }

    return (
      <li className={cssClass}>
        <img src={user.avatar_url} className="friend-avatar" />
        <span>
          {`${user.fname} ${user.lname} (${user.email})`}
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
          <button className="blue-button"
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
    } else if(friendType === 'userSearchResult') { // for user search results
        friendOptions = (
          <div className="friend-options">
            <button className="blue-button"
              onClick={this.handleClick(friendStatus, "added")}>
              ADD
            </button>
          </div>
        );
    } else {
      friendOptions = (
        <div className="friend-added">
          Added
        </div>
      );

    }

    return friendOptions;
  }

  handleClick(arg, friendType) {
    const {action, fetchFriendStatuses} = this.props;
    // arg can be either friendStatus POJO, or friendStatusID
    return () => {
      action(arg).then(()=>{
        fetchFriendStatuses();
        if (friendType) {
          this.setState({friendType});
        }
      });
    };
  }
}

export default FriendIndexItem;
