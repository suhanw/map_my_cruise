import {connect} from 'react-redux';
import {createWorkout, receiveWorkoutErrors} from '../../actions/workouts_actions';
import WorkoutForm from './workout_form';
import {openModal, closeModal} from '../../actions/modal_actions';
import {fetchRoutes} from '../../actions/routes_actions';

const mapStateToProps = ({errors, ui: {modal}, entities: {routes}}, ownProps)=>{
  let workout = {
    name: '',
    date: '',
    duration: null,
    route: null,
  };

  return {
    modal,
    errors,
    workout,
    formType: 'new',
    routes,
  };
};

const mapDispatchToProps = (dispatch)=>{
  return {
    action: (workout) => dispatch(createWorkout(workout)),
    fetchRoutes: () => dispatch(fetchRoutes()),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    receiveWorkoutErrors: (errors) => dispatch(receiveWorkoutErrors(errors)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (WorkoutForm);
