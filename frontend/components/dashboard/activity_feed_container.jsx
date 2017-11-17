import {connect} from 'react-redux';
import ActivityFeed from './activity_feed';
import {fetchActivities} from '../../actions/activities_actions';

const mapStateToProps = ({entities: {activities, workouts, routes, users}}, ownProps) => {
  return {
    activities,
    workouts,
    routes,
    users,
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
