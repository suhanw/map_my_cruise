import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../spinner';
import * as WorkoutActions from '../../actions/workouts_actions';
import * as RouteActions from '../../actions/routes_actions';

const mapStateToProps = (state, ownProps) => {
  const {entities: {workouts, routes, users}} = state;
  const {activity} = ownProps;
  return {
    activity,
    workouts,
    routes,
    users,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRoute: (routeId) => dispatch(RouteActions.fetchRoute(routeId)),
    fetchWorkout: (workoutId) => dispatch(WorkoutActions.fetchWorkout(workoutId)),
  };
};

class ActivityFeedItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  render() {

    if (this.state.loading) {
      return (
        <li>
          <div className="spinner-box">
            <Spinner />
          </div>
        </li>
      );
    }

    const {user_id, feedable_type, feedable_id} = this.props.activity;
    const user = this.props.users[user_id];
    let feedable;
    if (feedable_type === 'Route') {
      feedable = this.props.routes.routes_by_id[feedable_id];
    } else if (feedable_type === 'Workout') {
      feedable = this.props.workouts.workouts_by_id[feedable_id];
    }

    return (
      <li>
        {`${user.fname} ${user.lname} created ${feedable_type} ${feedable.name}`}
      </li>
    );
  }

  componentDidMount() {
    const {activity, fetchRoute, fetchWorkout} = this.props;
    if (activity.feedable_type === 'Route') {
      fetchRoute(activity.feedable_id).then(()=>this.setState({loading: false}));
    } else if (activity.feedable_type === 'Workout') {
      fetchWorkout(activity.feedable_id).then(()=>this.setState({loading: false}));
    }
  }
}

export default connect
  (mapStateToProps, mapDispatchToProps)
  (ActivityFeedItem);
