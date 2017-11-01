import {connect} from 'react-redux';
import {createComment, deleteComment} from '../../actions/comments_actions';
import CommentIndex from '../comments/comment_index';

const mapStateToProps = ({entities: {comments, users}}, ownProps) => {
  let workoutComments = [];
  if (ownProps.workout.comments) { //to check if workout has comments
    workoutComments = ownProps.workout.comments.map((commentId)=>{
      return comments[commentId];
    });
  }

  return {
    workout: ownProps.workout,
    workoutComments,
    users,
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
