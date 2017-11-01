import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    let comment = this.props.comment;
    let user = this.props.user;
    return (
      <li>
        <img className="comment-author-avatar" src={user.avatar_url} />
        <div className="comment-details">
          <h3 className="comment-author">
            {`${user.fname} ${user.lname}`}
          </h3>
          <button onClick={this.handleClick}>Delete</button>
          <article className="comment-body">
            {comment.body}
          </article>
        </div>
      </li>
    );
  }

  handleClick() {
    const workout = this.props.workout;
    const commentId = this.props.comment.id;
    workout.comments.splice(workout.comments.indexOf(commentId), 1);
    this.props.deleteComment(commentId);
  }
}

export default CommentIndexItem;
