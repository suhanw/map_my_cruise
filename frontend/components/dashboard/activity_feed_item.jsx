import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../spinner';
import * as WorkoutActions from '../../actions/workouts_actions';
import * as RouteActions from '../../actions/routes_actions';
import RouteMap from '../routes/route_map';
import CommentIndexContainer from '../comments/comment_index_container';

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

    this.renderRouteItem = this.renderRouteItem.bind(this);
    this.renderWorkoutItem = this.renderWorkoutItem.bind(this);
    this.renderDuration = this.renderDuration.bind(this);
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

    if (feedable_type === 'Route') {
      return this.renderRouteItem(feedable);
    } else if (feedable_type === 'Workout') {
      return this.renderWorkoutItem(feedable);
    }

  }

  renderWorkoutItem(workout) {
    const {user_id} = this.props.activity;
    const user = this.props.users[user_id];
    const routeDist = this.props.routes.routes_by_id[workout.route].distance;
    let workoutDate = workout.workout_date.split("-");
    workoutDate = workoutDate.slice(1).concat(workoutDate.slice(0, 1));
    workoutDate = workoutDate.join('/');

    return (
      <li>
        <article className="workout">
          <img className="avatar" src={user.avatar_url} />
          <section>
            <span className="user-action">
                <Link to={`/workouts/${workout.id}`}>
                  {`${user.fname} ${user.lname}`} ran {`${routeDist} miles`}
                </Link>
            </span>
            <span className="feed-workout-details">
              <figure>
                <i className="fa fa-road" aria-hidden="true"></i>
                <small>
                  DISTANCE
                </small>
                <div>
                  <strong>{routeDist}</strong> <small>mi</small>
                </div>
              </figure>
              <figure>
                <i className="fa fa-fighter-jet fa-rotate-270" aria-hidden="true"></i>
                <small>
                  AVG PACE
                </small>
                <strong>
                  {this.renderDuration(workout.duration/routeDist)}
                </strong>
              </figure>
              <figure>
                <i className="fa fa-clock-o" aria-hidden="true"></i>
                <small>
                  DURATION
                </small>
                <strong>
                  {this.renderDuration(workout.duration)}
                </strong>
              </figure>
            </span>
            <span className="comment-section">
              <strong>
                <i className={`fa fa-commenting-o ${workout.comments.length ? `has-comments`: null}`} aria-hidden="true"></i>
                &nbsp;
                {workout.comments.length}
              </strong>
              <small>{workoutDate}</small>
            </span>
            <span className="comment-section-items">
              <CommentIndexContainer workoutId={workout.id} />
            </span>
          </section>
        </article>
      </li>
    );
  }

  renderDuration(duration) {
    const h = Math.floor(duration / 3600);
    const m = Math.floor(duration % 3600 / 60);
    const s = Math.floor(duration % 3600 % 60);

    return ('0' + h).slice(-2) + ":" +
    ('0' + m).slice(-2) + ":" +
    ('0' + s).slice(-2);
  }

  renderRouteItem(route) {
    const {user_id} = this.props.activity;
    const user = this.props.users[user_id];

    return (
      <li>
        <article className="route">
          <img className="avatar" src={user.avatar_url} />
          <section>
            <span className="user-action">
              <strong>
                {`${user.fname} ${user.lname} created the route ${route.name}`}
              </strong>
              <i className="fa fa-map-marker" aria-hidden="true"></i>
            </span>
            <figure>
              <RouteMap route={route} thumbnail size={[300, 150]}/>
            </figure>
            <figcaption>
              <i className="fa fa-road" aria-hidden="true"></i>
              <small>DISTANCE</small>
              <strong>{route.distance}</strong>
              <small>mi</small>
            </figcaption>
            <span className="comment-section">
              <strong></strong>
              <small>{route.created_at}</small>
            </span>
          </section>
        </article>
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
