import React from 'react';
import {Link} from 'react-router-dom';

class WorkoutIndexItem extends React.Component  {
  render() {
    const workout = this.props.workout;
    const route = this.props.route;
    return (
      <li className="workout-item">
        <div className="workout-item-details">
          <span>{workout.name}</span>
          <span>{route.distance} mi</span>
          <span>{workout.workout_date}</span>
        </div>
      </li>
    );
  }
}

export default WorkoutIndexItem;
