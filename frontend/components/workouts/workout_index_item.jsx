import React from 'react';
import {Link} from 'react-router-dom';

class WorkoutIndexItem extends React.Component  {
  render() {
    const workout = this.props.workout;
    return (
      <li className="workout-item">
        <div className="workout-item-details">
          <span>{workout.name}</span>
          <span>distance</span>
        </div>
      </li>
    );
  }
}

export default WorkoutIndexItem;
