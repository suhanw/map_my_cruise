import {connect} from 'react-redux';
import ActivityFeed from './activity_feed';
import {fetchActivities} from '../../actions/activities_actions';

const mapStateToProps = (state, ownProps) => {
  const {
    entities: {activities, workouts, routes, users},
    session: {currentUser}
  } = state;
  return {
    activities,
    workouts,
    routes,
    users,
    currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchActivities: () => dispatch(fetchActivities()),
  };
};

export default connect
  (mapStateToProps, mapDispatchToProps)
  (ActivityFeed);
