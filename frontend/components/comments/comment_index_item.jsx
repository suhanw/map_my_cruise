import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.renderDeleteButton = this.renderDeleteButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    debugger
    let comment = this.props.comment;
    let user = this.props.user;
    return (
      <li>
        <img className="comment-author-avatar" src={user.avatar_url} />
        <div className="comment-details">
          <h3 className="comment-author">
            {`${user.fname} ${user.lname}`}
          </h3>
          <span className="comment-delete">
            {this.renderDeleteButton()} | {comment.created_at}
          </span>
          <article className="comment-body">
            {comment.body}
          </article>
        </div>
      </li>
    );
  }

  renderDeleteButton() {
    const {user, currentUser} = this.props;
    if (user.id === currentUser.id) {
      return (
        <button onClick={this.handleClick}>Delete</button>
      );
    }
    return null;
  }

  handleClick() {
    const workout = this.props.workout;
    const commentId = this.props.comment.id;
    workout.comments.splice(workout.comments.indexOf(commentId), 1);
    this.props.deleteComment(commentId);
  }
}

export default CommentIndexItem;
