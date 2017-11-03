import React from 'react';
import {Link} from 'react-router-dom';
import WorkoutIndexItem from './workout_index_item';
import Spinner from '../spinner';

class WorkoutIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderItems = this.renderItems.bind(this);
  }

  render() {
    if (this.state.loading) {
      return (
        <section className="workout-index">
          <div className="spinner-box">
            <Spinner />;
          </div>
        </section>
      );
    }


    if (!(this.props.workouts.ordered_ids.length)) {
      return (
        <section className="workout-index">
          <span className="message">
            Have you been working out??? Get to running!
            Click <Link to="/workouts/create">here</Link> to log a workout.
            <img src="https://media.giphy.com/media/xT0GqxMO3R5GEh5KdW/giphy.gif" />
          </span>
        </section>
      );
    }

    return (
      <section className="workout-index">
        <ul>
          {this.renderItems()}
        </ul>
      </section>
    );
  }

  renderItems() {
    let items = [];
    this.props.workouts.ordered_ids.forEach((id)=>{
      let workout = this.props.workouts.workouts_by_id[id];
      let route = this.props.routes.routes_by_id[workout.route];
      items.push(
        <Link to={`/workouts/${workout.id}`} key={workout.id}>
          <WorkoutIndexItem
            workout={workout}
            route={route} />
        </Link>
      );
    });
    return items;
  }

  componentDidMount() {
    this.props.fetchWorkouts().then(
      ()=>{
        this.setState({loading: false});
      }
    );
  }
}

export default WorkoutIndex;
