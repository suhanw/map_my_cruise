import {connect} from 'react-redux';
import {createComment, deleteComment} from '../../actions/comments_actions';
import CommentIndex from '../comments/comment_index';

const mapStateToProps = ({entities: {comments}}, ownProps) => {
  let workoutComments = [];
  if (ownProps.workoutCommentsArr) { //to check if workout has comments
    workoutComments = ownProps.workoutCommentsArr.map((commentId)=>{
      return comments[commentId];
    });
  }

  return {
    workoutComments,
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
