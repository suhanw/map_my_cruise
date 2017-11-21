import React from 'react';
import {Link} from 'react-router-dom';
import CommentIndexItem from './comment_index_item';
import Spinner from '../spinner';
import CommentFormContainer from './comment_form_container';

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
          currentUser={that.props.currentUser}
          deleteComment={that.props.deleteComment} />
      );
    });

    return (
      <section className="workout-comments">
        {!workoutComments.length ?
          (
            <span>
              Be the first to comment!
            </span>
          ) :
          (
            <ul>
              {workoutComments}
            </ul>
          )
        }
        <CommentFormContainer workout={this.props.workout} />
      </section>
    );
  }
}

export default CommentIndex;
