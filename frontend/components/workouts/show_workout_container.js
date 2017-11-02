import {connect} from 'react-redux';
import ShowWorkout from './show_workout';
import {fetchWorkout, deleteWorkout} from '../../actions/workouts_actions';
import {closeModal, openModal} from '../../actions/modal_actions';

const mapStateToProps = ({entities: {workouts, users, routes, comments}, errors, ui:{modal}, session: {currentUser}}, ownProps) => {
  const workoutId = ownProps.match.params.workoutId;
  let loading = true;
  let workout = workouts.workouts_by_id[workoutId];
  let workoutCreator;
  let routeCreator;
  let route;
  let commentsArr;


  if (workout) {
    workoutCreator = users[workout.user];
    route = routes.routes_by_id[workout.route];
    routeCreator = users[route.user];
    loading = false;
  }

  return {
    workout,
    workoutCreator,
    route,
    routeCreator,
    errors: errors.workouts,
    loading,
    modal,
    commentsArr,
    currentUser,
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
