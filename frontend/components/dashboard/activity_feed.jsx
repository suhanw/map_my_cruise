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
    this.scrollFetch = this.scrollFetch.bind(this);
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

  scrollFetch(e) {
    const offset = this.props.activities.ordered_ids.length;
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) { // detect when someone scrolls to the bottom of browser window
      console.log('bottom', offset);
      this.props.fetchActivities(offset);
    }
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
        <FriendIndexContainer thumbnail />
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
    let activitiesDom;

    if (ordered_ids.length) {
      activitiesDom = ordered_ids.map((id)=>{
        return (
          <ActivityFeedItem key={id}
            activity = {activities_by_id[id]} />
        );
      });
    } else {
      activitiesDom = <li className="message">No activity to display.</li>;
    }

    return activitiesDom;
  }

  componentWillReceiveProps(newProps){
    console.log('old props', this.props.activities.ordered_ids.length);
    console.log('new props', newProps.activities.ordered_ids.length);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.scrollFetch);
    const {activities} = this.props;
    if (activities.ordered_ids && activities.ordered_ids.length) { // to avoid dispatching AJAX if feed is already populated
      this.setState({loading: false});
      return;
    }
    this.props.fetchActivities().then(
      ()=> this.setState({loading: false})
    );
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollFetch);
  }
}

export default ActivityFeed;
