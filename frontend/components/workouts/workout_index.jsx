import React from 'react';
import {Link} from 'react-router-dom';
import WorkoutIndexItem from './workout_index_item';

class WorkoutIndex extends React.Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
  }

  render() {
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
    this.props.fetchWorkouts();
  }
}

export default WorkoutIndex;
