import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner';
import ActivityFeedItem from './activity_feed_item';

class ActivityFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderActivities = this.renderActivities.bind(this);
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

        <aside className="activity-feed-sidebar">
          This is sidebar
        </aside>
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
