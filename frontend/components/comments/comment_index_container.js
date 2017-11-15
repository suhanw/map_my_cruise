import {connect} from 'react-redux';
import {createComment, deleteComment} from '../../actions/comments_actions';
import CommentIndex from '../comments/comment_index';

const mapStateToProps = ({entities: {comments, users, workouts}, session: {currentUser}}, ownProps) => {
  let workoutComments = [];
  let workout = workouts.workouts_by_id[ownProps.workoutId];
  if (workout.comments) { //to check if workout has comments
    workoutComments = workout.comments.map((commentId)=>{
      return comments[commentId];
    });
  }

  return {
    workout,
    workoutComments,
    users,
    currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createComment: (comment) => dispatch(createComment(comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (CommentIndex);
