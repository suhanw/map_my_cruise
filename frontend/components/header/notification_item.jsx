import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchComment} from '../../actions/comments_actions';

const mapStateToProps = (state, ownProps) => {
  const {notification} = ownProps;
  const {entities: {comments}} = state;
  const {entities: {users}} = state;
  return {
    notification,
    comments,
    users,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchComment: (commentId) => dispatch(fetchComment(commentId)),
  };
};

class NotificationItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderCommentItem = this.renderCommentItem.bind(this);
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    if (this.props.notificationDropdownActive) {
      console.log('dropdown active');
    }


    const {notification} = this.props;

    if (notification.notifiable_type === 'Comment') {
      return this.renderCommentItem(notification);
    }
  }

  componentDidMount() {
    const {notification} = this.props;
    if (notification.notifiable_type === 'Comment') {
      this.props.fetchComment(notification.notifiable_id).then(
        () => this.setState({loading: false})
      );
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
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);
