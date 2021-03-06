import React from 'react';
import {Link} from 'react-router-dom';
import {randomizer} from '../../util/randomizer';
import Modal from '../modals/modal';
import FormErrorModal from '../modals/form_error_modal';
import Spinner from '../spinner';

class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);

    const {name, workout_date, duration, route} = this.props.workout;

    const initDate = workout_date ? workout_date : new Date().toISOString().substr(0, 10);
    this.state = {
      name,
      workout_date: initDate,
      route,
      h: '', //duration
      m: '', //duration
      s: '', //duration
      loadingRoutes: true,
    };

    if (this.props.formType === 'edit') {
      this.state['loading'] = true;
      this.state = Object.assign(this.state, this.renderDuration(duration));
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderWorkoutForm = this.renderWorkoutForm.bind(this);
    this.renderRouteOptions = this.renderRouteOptions.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formType === 'edit') {
      this.setState ({
        name: newProps.workout.name,
        workout_date: newProps.workout.workout_date,
        route_id: newProps.workout.route,
        h: this.renderHours(newProps.workout.duration),
        m: this.renderMinutes(newProps.workout.duration),
        s: this.renderSeconds(newProps.workout.duration),
      });
    }
  }

  componentDidMount(){
    if (this.props.formType === 'edit') {
      this.props.fetchWorkout(this.props.match.params.workoutId).then(
        ()=>{
          this.setState({
            loading: false
          });
        }
      );
    }

    this.props.fetchRoutes().then(
      ()=>{
        this.setState({
          loadingRoutes: false
        });
      }
    );

  }

  render() {

    const adGifClass = `ad-gif-${randomizer(3, 1)}`;

    if (this.state.loading) {
      return (
        <div className="spinner-box">
          <Spinner />;
        </div>
      );
    }

    return (
      <section className="workout-form-container">
        <h2>LOG A WORKOUT</h2>

        <Modal modal={this.props.modal}
          errors = {this.props.errors.workouts}
          component={FormErrorModal}
          closeModal={this.props.closeModal} />

        {this.renderErrorMessage() ? this.renderErrorMessage() : this.renderWorkoutForm()}

        <aside className="workout-form-sidebar">
          <div className={adGifClass}>
            <small>Ad</small>
            <small>Rent this movie somewhere near you.</small>
          </div>
        </aside>

      </section>
    );
  }

  renderErrorMessage() {
    if (this.props.formType === 'edit' && this.props.workout.user !== this.props.currentUser.id) {
      return (
        <span className="message">
          You are not authorized to edit this workout!
        </span>
      );
    } else if (!this.state.loadingRoutes && !this.props.routes.ordered_ids.length) { // if no routes have been created yet
      return (
        <span className="message">
          You need a route before you can log a workout. Click <Link to="/routes/create">here</Link> to create your first route.
        </span>
      );
    } else {
      return null;
    }
  }

  renderWorkoutForm() {
    return (
      <form className="workout-form">

        <p>
          If you've been active, get credit for it! Add your workout
          details below, and stay on top of your fitness goals.
        </p>

        <section className="workout-form-box">
          <label className="workout-form-name">
            Workout name
            <input type="text"
              value={this.state.name}
              placeholder="Name your workout"
              onChange={this.handleChange('name')} />
          </label>
          <label className="workout-form-date">
            Date
            <input type="date"
              value={this.state.workout_date}
              onChange={this.handleChange('workout_date')} />
          </label>

          <label className="workout-form-route-option">
            Route
            <select onChange={this.handleChange('route')} value={this.state.route ? this.state.route : "default"}>
              {this.renderRouteOptions()}
            </select>
          </label>


          <label className="workout-form-duration">
            <span>Duration</span>
            <input type="text" placeholder="hh"
              value={this.state.h}
              onChange={this.handleChange('h')} /> : <input type="text" placeholder="mm"
              value={this.state.m}
              onChange={this.handleChange('m')} /> : <input type="text" placeholder="ss"
              value={this.state.s}
              onChange={this.handleChange('s')} />
          </label>

          <label className="workout-form-button">
            <button className="blue-button"
              onClick={this.handleClick}>
              SAVE
            </button>
          </label>

        </section>

      </form>
    );
  }

  handleChange(key) {
    const that = this;
    return (e) => {
      that.setState({[key]: e.target.value});
    };
  }

  handleClick(e) {
    e.preventDefault();

    let duration = this.state.h ? this.state.h * 3600 : 0;
    duration += this.state.m ? this.state.m * 60 : 0;
    duration += this.state.s ? this.state.s * 1 : 0;

    const workout = {
      name: this.state.name,
      workout_date: this.state.workout_date,
      duration: duration,
      route_id: this.state.route,
    };

    if (this.props.formType === 'edit') {
      workout.id = this.props.workout.id;
    }

    this.props.action(workout).then(
      (action)=>{
        const workoutId = Object.keys(action.payload.workouts_by_id)[0];
        this.props.history.push(`/workouts/${workoutId}`);
      },
      ()=>{
        this.props.openModal('errors');
      }
    );

  }

  renderRouteOptions() {
    if (this.state.loadingRoutes) {
      return (
        <option disabled="disabled" value="default">
          Loading available routes..
        </option>
      );
    }

    let routeOptions = [];

    if (this.props.formType === 'new') {
      routeOptions.push(
        <option key="default" disabled="disabled" value="default">Select your route</option>
      );
    }

    this.props.routes.ordered_ids.forEach((routeId)=>{
      const route = this.props.routes.routes_by_id[routeId];
      routeOptions.push(
        <option key={route.id}
          value={route.id}  >{
            `${route.name} - ${route.distance}mi in ${route.city}`
        }</option>
      );
    });
    return routeOptions;

  }

  renderHours(duration) {
    return Math.floor(duration / 3600);
  }

  renderMinutes(duration) {
    return Math.floor(duration % 3600 / 60);
  }

  renderSeconds(duration) {
    return Math.floor(duration % 3600 % 60);
  }

  renderDuration(duration) {
    return {
      h: this.renderHours(duration),
      m: this.renderMinutes(duration),
      s: this.renderSeconds(duration),
    };
  }
}

export default WorkoutForm;
