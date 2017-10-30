import React from 'react';
import {Link} from 'react-router-dom';
import WorkoutIndexContainer from './workout_index_container';

class DisplayWorkouts extends React.Component {
  render() {

    return (
      <section className="display-workouts-container">

        <div className="display-workouts-header">
          <h2>
            MY WORKOUTS
          </h2>
          <Link to="workouts/create" className="create-workout-button">
            LOG A WORKOUT
          </Link>
        </div>

        <WorkoutIndexContainer />

        <aside className="workout-index-sidebar">
          <div className="ad-gif">
            Ad goes here
          </div>
        </aside>

      </section>
    );
  }
}

export default DisplayWorkouts;
