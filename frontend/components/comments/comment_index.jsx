import React from 'react';
import {Link} from 'react-router-dom';
import CommentIndexItem from './comment_index_item';
import Spinner from '../spinner';

class CommentIndex extends React.Component {
  render () {
    const that = this;
    // loop through the array of comment ids for a given workout
    let workoutComments = [];
    workoutComments = this.props.workoutComments.map((comment) => {
      return (
        <CommentIndexItem key={comment.id}
          workout={that.props.workout}
          comment={comment}
          user={that.props.users[comment.user]}
          deleteComment={that.props.deleteComment} />
      );
    });

    if (!workoutComments.length) {
      return (
        <section className="workout-comments">
          Be the first to comment!
        </section>
      );
    }

    return (
      <section className="workout-comments">
        <ul>
          {workoutComments}
        </ul>
      </section>
    );
  }
}

export default CommentIndex;
