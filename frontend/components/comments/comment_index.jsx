import React from 'react';
import {Link} from 'react-router-dom';
import CommentIndexItem from './comment_index_item';
import Spinner from '../spinner';

class CommentIndex extends React.Component {
  render () {
    let workoutComments = this.props.workoutComments.map((comment) => {
      return (
        <CommentIndexItem key={comment.id}
          comment={comment}
          deleteComment={this.props.deleteComment} />
      );
    });

    return (
      <section className="comments">
        <ul>
          {workoutComments}
        </ul>
      </section>
    );
  }
}

export default CommentIndex;
