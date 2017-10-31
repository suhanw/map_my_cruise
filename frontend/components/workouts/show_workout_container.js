import {connect} from 'react-redux';
import ShowWorkout from './show_workout';
import {fetchWorkout, deleteWorkout} from '../../actions/workouts_actions';
import {closeModal, openModal} from '../../actions/modal_actions';

const mapStateToProps = ({entities: {workouts, users, routes}, errors, ui:{modal}}, ownProps) => {
  const workoutId = ownProps.match.params.workoutId;
  let loading = true;
  let workout = workouts.workouts_by_id[workoutId];
  let user;
  let route;


  if (workout) {
    user = users[workout.user_id];
    route = routes.routes_by_id[workout.route];
    if (user && route) {
      loading = false;
    }
  } 

  return {
    workout,
    user,
    route,
    errors: errors.workouts,
    loading,
    modal,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
    deleteWorkout: (workoutId) => dispatch(deleteWorkout(workoutId)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (ShowWorkout);
