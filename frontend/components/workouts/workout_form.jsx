import React from 'react';
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
      h: null, //duration
      m: null, //duration
      s: null, //duration
      loadingRoutes: true,
    };

    if (this.props.formType === 'edit') {
      this.state['loading'] = true;
      this.state = Object.assign(this.state, this.renderDuration(duration));
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderRouteOptions = this.renderRouteOptions.bind(this);
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

        <Modal modal={this.props.modal}
          errors = {this.props.errors.workouts}
          component={FormErrorModal}
          closeModal={this.props.closeModal} />

        <form className="workout-form">
          <h2>LOG A WORKOUT</h2>
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
              <select onChange={this.handleChange('route')} value={this.state.route ? this.state.route : ""}>
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

        <aside className="workout-form-sidebar">
          <div className={adGifClass}>
            <small>Ad</small>
            <small>Rent this movie somewhere near you.</small>
          </div>
        </aside>

      </section>
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
        <option selected disabled="disabled" value="">
          Loading available routes..
        </option>
      );
    }

    let routeOptions = [];

    if (this.props.formType === 'new') {
      routeOptions.push(
        <option key="default" selected disabled="disabled" value="">Select your route</option>
      );
    }

    this.props.routes.ordered_ids.forEach((routeId)=>{
      const route = this.props.routes.routes_by_id[routeId];
      routeOptions.push(
        <option key={route.id}
          selected={(route.id === this.state.route_id) ? "true" : ""}
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
