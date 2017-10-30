import {connect} from 'react-redux';
import WorkoutIndex from './workout_index';
import {fetchWorkouts} from '../../actions/workouts_actions';

const mapStateToProps = ({entities: {workouts}, session: {currentUser}}) => {

  return {
    workouts,
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    fetchWorkouts: () => dispatch(fetchWorkouts()),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (WorkoutIndex);
