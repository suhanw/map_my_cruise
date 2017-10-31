import {connect} from 'react-redux';
import {fetchWorkout, updateWorkout, receiveWorkoutErrors} from '../../actions/workouts_actions';
import WorkoutForm from './workout_form';
import {openModal, closeModal} from '../../actions/modal_actions';
import {fetchRoutes} from '../../actions/routes_actions';

const mapStateToProps = ({errors, ui: {modal}, entities: {workouts, routes}}, ownProps)=>{
  let workout = workouts.workouts_by_id[ownProps.match.params.workoutId];
  if(!workout) {
    workout = {
      name: '',
      workout_date: '',
      duration: null,
      route: null,
    };
  }

  return {
    modal,
    errors,
    workout,
    formType: 'edit',
    routes,
  };
};

const mapDispatchToProps = (dispatch)=>{
  return {
    action: (workout) => dispatch(updateWorkout(workout)),
    fetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
    fetchRoutes: () => dispatch(fetchRoutes()),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    receiveWorkoutErrors: (errors) => dispatch(receiveWorkoutErrors(errors)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (WorkoutForm);
