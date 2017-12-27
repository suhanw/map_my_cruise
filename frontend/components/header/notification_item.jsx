import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchComment} from '../../actions/comments_actions';
import {updateNotification} from '../../actions/notifications_actions';
import {fetchFriendStatus} from '../../actions/friends_actions';
import {fetchLike} from '../../actions/likes_actions';

const mapStateToProps = (state, ownProps) => {
  const {notification} = ownProps;
  const {entities: {comments}} = state;
  const {entities: {users}} = state;
  const {entities: {friends}} = state;
  const {entities: {likes}} = state;
  return {
    notification,
    comments,
    users,
    friends,
    likes,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchComment: (commentId) => dispatch(fetchComment(commentId)),
    updateNotification: (notification) => dispatch(updateNotification(notification)),
    fetchFriendStatus: (friendStatusId) => dispatch(fetchFriendStatus(friendStatusId)),
    fetchLike: (likeId) => dispatch(fetchLike(likeId)),
  };
};

class NotificationItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderCommentItem = this.renderCommentItem.bind(this);
    this.renderFriendItem = this.renderFriendItem.bind(this);
    this.renderLikeItem = this.renderLikeItem.bind(this);
  }

  render() {
    if (this.state.loading) return null;

    const {notification} = this.props;

    if (notification.notifiable_type === 'Comment') {
      return this.renderCommentItem(notification);
    } else if (notification.notifiable_type === 'FriendStatus') {
      return this.renderFriendItem(notification);
    } else if (notification.notifiable_type === 'Like') {
      return this.renderLikeItem(notification);
    }
  }

  componentDidMount() {
    const {notification} = this.props;
    if (notification.notifiable_type === 'Comment') {
      this.props.fetchComment(notification.notifiable_id).then(
        () => this.setState({loading: false})
      );
    } else if (notification.notifiable_type === 'FriendStatus') {
      this.props.fetchFriendStatus(notification.notifiable_id).then(
        () => this.setState({loading: false})
      );
    } else if (notification.notifiable_type === 'Like') {
      this.props.fetchLike(notification.notifiable_id).then(
        () => this.setState({loading: false})
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const notificationDropdownClosed = prevProps.notificationDropdownActive === true && this.props.notificationDropdownActive === false; // when user closes the notif dropdown
    const notificationUnread = !this.props.notification.read; //if it's a new notification

    if (notificationDropdownClosed && notificationUnread) {
      console.log('notif item cdu');
      const {notification} = this.props;
      let newNotification = Object.assign({}, notification);
      newNotification.read = true;
      this.props.updateNotification(newNotification); // to mark notif as read
    }
  }

  renderCommentItem(notification) {
    const commentId = notification.notifiable_id;
    const comment = this.props.comments[commentId];
    if (!comment) return null; //in case author removes comment
    const user = this.props.users[comment.user];
    return(
      <li className={notification.read ? "" : "new-notification"}><b>{user.fname} {user.lname}</b> commented on your <Link to={`/workouts/${comment.workout_id}`}>workout</Link>. </li>
    );
  }

  renderFriendItem(notification) {
    const friendStatusId = notification.notifiable_id;
    const friendStatus = this.props.friends[friendStatusId];
    if (!friendStatus) return null; //in case author deletes friend
    const friend = this.props.users[friendStatus.friend];
    return (
      <li className={notification.read ? "" : "new-notification"}><b>{friend.fname} {friend.lname}</b> sent a friend <Link to='/friends'>request</Link>. </li>
    );
  }

  renderLikeItem(notification) {
    const likeId = notification.notifiable_id;
    const like = this.props.likes[likeId];
    if (!like) return null;
    const user = `${like.user_fname} ${like.user_lname}`;
    const resource = like.likable_type.toLowerCase();
    const resourcePath = `/${resource}s/${like.likable_id}`;
    return (
      <li className={notification.read ? "" : "new-notification"}><b>{user}</b> liked your <Link to={resourcePath}>{resource}</Link>. </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);
