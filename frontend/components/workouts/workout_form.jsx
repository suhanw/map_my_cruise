import React from 'react';
import {randomizer} from '../../util/randomizer';


class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);

    const {name, duration, route} = this.props.workout;

    let h;
    let m;
    let s;

    if (duration) {
      h = this.renderHours(duration);
      m = this.renderMinutes(duration);
      s = this.renderSeconds(duration);
    }

    const date = new Date().toISOString().substr(0, 10);

    this.state = {
      name,
      date,
      route,
      h,
      m,
      s,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.fetchRoutes()
  }

  render() {

    const adGifClass = `ad-gif-${randomizer(3, 1)}`;


    return (
      <section className="workout-form-container">
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
                value={this.state.date}
                onChange={this.handleChange('date')} />
            </label>

            <label className="workout-form-route-option">
              Route
              <select onChange={this.handleChange('route')}>
                <option selected disabled="disabled" value="">Select your route</option>
                <option>ssdf</option>
                <option>ssdf</option>
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
    return (e) => {
      this.setState({[key]: e.target.value});
    };
  }

  handleClick(e) {
    e.preventDefault();

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

}

export default WorkoutForm;
