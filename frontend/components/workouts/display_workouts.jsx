import React from 'react';
import {Link} from 'react-router-dom';
import WorkoutIndexContainer from './workout_index_container';
import {randomizer} from '../../util/randomizer';

class DisplayWorkouts extends React.Component {

  render() {
    const adGifClass = `ad-gif-${randomizer(3, 1)}`;
    return (
      <section className="display-workouts-container">

        <div className="display-workouts-header">
          <h2>
            MY WORKOUTS
          </h2>
          <Link to="/workouts/create" className="orange-button">
            LOG A WORKOUT
          </Link>
        </div>

        <WorkoutIndexContainer />

        <aside className="workout-index-sidebar">
          <div className={adGifClass}>
            <small>Ad</small>
            <small>Rent this movie somewhere near you.</small>
          </div>
        </aside>

      </section>
    );
  }
}

export default DisplayWorkouts;
