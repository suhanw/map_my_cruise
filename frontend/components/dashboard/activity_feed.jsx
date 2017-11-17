import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner';


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
        <section className="activity-feed-container">
          <div className="spinner-box">
            <Spinner />
          </div>
        </section>
      );
    }

    return (
      <section className="activity-feed-container">
        <ul>
          {this.renderActivities()}
        </ul>
      </section>
    );
  }

  renderActivities() {
    const {ordered_ids, activities_by_id} = this.props.activities;
    const activitiesDom = ordered_ids.map((id)=>{
      return (
        <li>
          {activities_by_id[id].user_id}
        </li>
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
