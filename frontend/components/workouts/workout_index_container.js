import {connect} from 'react-redux';
import WorkoutIndex from './workout_index';
import {fetchWorkouts} from '../../actions/workouts_actions';

const mapStateToProps = ({entities: {workouts, routes}, session: {currentUser}}) => {
  const loading = workouts.ordered_ids.length ? false : true;
  return {
    loading,
    workouts,
    routes,
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
