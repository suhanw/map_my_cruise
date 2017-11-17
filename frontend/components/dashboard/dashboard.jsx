import React from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {randomizer} from '../../util/randomizer';
import SectionNav from '../section_nav';
import {ProtectRoute} from '../../util/route_util';
import DisplayWorkouts from '../workouts/display_workouts';
import RouteIndexContainer from '../routes/route_index_container';
import ActivityFeedContainer from './activity_feed_container';

class Dashboard extends React.Component {

  render() {
    const sectionNavTabs = ['/dashboard', '/dashboard/workouts', '/dashboard/routes'];
    return (
      <section className="dashboard-container">
        <h2>MY DASHBOARD</h2>
        <SectionNav sectionNavTabs={sectionNavTabs}/>

        <ProtectRoute path="/dashboard/workouts" component={DisplayWorkouts} />
        <ProtectRoute path="/dashboard/routes" component={RouteIndexContainer} />
        <ProtectRoute exact path="/dashboard" component={ActivityFeedContainer} />

      </section>
    );
  }
}

export default Dashboard;
