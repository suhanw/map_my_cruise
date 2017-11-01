import {connect} from 'react-redux';
import CommentForm from './comment_form';
import {createComment, receiveCommentErrors} from '../../actions/comments_actions';
import {fetchWorkout} from '../../actions/workouts_actions';

const mapStateToProps = ({session: {currentUser}, errors, entities: {workouts: workouts_by_id}}, ownProps) => {
  let comment = {
    body: '',
    workout_id: ownProps.workout.id,
    user: currentUser,
  };

  return {
    comment,
    errors,
    workout: ownProps.workout,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createComment: (comment) => dispatch(createComment(comment)),
    receiveCommentErrors: (errors) => dispatch(receiveCommentErrors(errors)),
    fetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (CommentForm);
