import {connect} from 'react-redux';
import {createWorkout, receiveWorkoutErrors} from '../../actions/workouts_actions';
import WorkoutForm from './workout_form';
import {openModal, closeModal} from '../../actions/modal_actions';

const mapStateToProps = ({errors, ui: {modal}}, ownProps)=>{
  let workout = {
    name: '',
    duration: null,
    route_id: null,
  };
  return {
    modal,
    errors,
    workout,
    formType: 'new',
  };
};

const mapDispatchToProps = (dispatch)=>{
  return {
    action: (workout) => dispatch(createWorkout(workout)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    receiveWorkoutErrors: (errors) => dispatch(receiveWorkoutErrors(errors)),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (WorkoutForm);
