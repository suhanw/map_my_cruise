import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner';
import ActivityFeedItem from './activity_feed_item';
import FriendIndexContainer from '../friends/friend_index_container';

class ActivityFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderActivities = this.renderActivities.bind(this);
    this.renderUserProfile = this.renderUserProfile.bind(this);
    this.renderFriends = this.renderFriends.bind(this);
  }

  render() {
    if (this.state.loading) {
      return (
        <section className="activity-feed">
          <div className="spinner-box">
            <Spinner />
          </div>


        </section>
      );
    }

    return (
      <section className="activity-feed">
        <ul className="activity-feed-main">
          {this.renderActivities()}
        </ul>

        <section className="activity-feed-sidebar">
          {this.renderUserProfile()}
          {this.renderFriends()}
        </section>
      </section>
    );
  }

  renderFriends() {
    return (
      <section className="activity-feed-friends">
        <span className="activity-feed-friends-header">
          <h3>FRIENDS</h3>
          <nav className="activity-feed-friends-options">
            <Link to="/friends">View All</Link> | <Link to="/friends/find">Find Friends</Link>
          </nav>
        </span>
        <figure className="activity-feed-friends-thumbnails">
          <FriendIndexContainer thumbnail />
        </figure>
      </section>
    );
  }

  renderUserProfile() {
    const {currentUser} = this.props;

    return (
      <section className="activity-feed-user-profile">
        <img className="avatar" src={currentUser.avatar_url} />
        <span className="user-name">
          {currentUser.fname.toUpperCase()} {currentUser.lname.toUpperCase()}
          <hr />
          <small>
            Running since {currentUser.created_at}
          </small>
        </span>
        <div className="user-options">
          <Link to="/edit_profile">
            Edit Profile
          </Link>
          <Link to="/friends/find">
            Find Friends
          </Link>
        </div>
      </section>
    );
  }

  renderActivities() {
    const {ordered_ids, activities_by_id} = this.props.activities;
    const activitiesDom = ordered_ids.map((id)=>{
      return (
        <ActivityFeedItem key={id}
          activity = {activities_by_id[id]} />
      );
    });

    return activitiesDom;
  }

  componentDidMount() {
    this.props.fetchActivities().then(
      ()=>{
        this.setState({loading: false});
      }
    );
  }
}

export default ActivityFeed;
