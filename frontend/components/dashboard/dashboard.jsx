import React from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {randomizer} from '../../util/randomizer';
import SectionNav from '../section_nav';
import {ProtectRoute} from '../../util/route_util';
import DisplayWorkouts from '../workouts/display_workouts';
import RouteIndexContainer from '../routes/route_index_container';
import ActivityFeed from './activity_feed';

class Dashboard extends React.Component {

  render() {
    const sectionNavTabs = ['/dashboard', '/workouts', '/routes'];
    return (
      <section className="dashboard-container">
        <SectionNav sectionNavTabs={sectionNavTabs}/>

        <ProtectRoute path="/workouts" component={DisplayWorkouts} />
        <ProtectRoute path="/routes" component={RouteIndexContainer} />
        <ProtectRoute path="/dashboard" component={ActivityFeed} />

        <DisplayWorkouts />
      </section>
    );
  }
}

export default Dashboard;
