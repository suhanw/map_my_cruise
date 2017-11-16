import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {AuthRoute, ProtectRoute} from '../util/route_util';
import SessionFormContainer from './session_form_container';
import HeaderContainer from './header_container';
import Splash from './splash';
import Footer from './footer';
import ProfileFormContainer from './profile_form_container';
import RouteIndexContainer from './routes/route_index_container';
import ShowRouteContainer from './routes/show_route_container';
import NewRouteFormContainer from './routes/new_route_form_container';
import EditRouteFormContainer from './routes/edit_route_form_container';
import DisplayWorkouts from './workouts/display_workouts';
import ShowWorkoutContainer from './workouts/show_workout_container';
import NewWorkoutFormContainer from './workouts/new_workout_form_container';
import EditWorkoutFormContainer from './workouts/edit_workout_form_container';
import DisplayFriends from './friends/display_friends';
import Dashboard from './dashboard/dashboard';
import ScrollToTop from './scroll_to_top';

const App = () => {
  return (
    <div className="app">
      <HeaderContainer />

      <Route exact path="/" component={Splash} />

      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <ProtectRoute path="/edit_profile" component={ProfileFormContainer} />

      <ScrollToTop>
        <Switch>
          <ProtectRoute path="/dashboard" component={Dashboard} />

          <ProtectRoute path="/routes/:routeId/edit" component={EditRouteFormContainer} />
          <ProtectRoute path="/routes/create" component={NewRouteFormContainer} />
          <ProtectRoute path="/routes/:routeId" component={ShowRouteContainer} />
          <ProtectRoute path="/routes" component={RouteIndexContainer} />

          <ProtectRoute path="/workouts/:workoutId/edit" component={EditWorkoutFormContainer} />
          <ProtectRoute path="/workouts/create" component={NewWorkoutFormContainer} />
          <ProtectRoute path="/workouts/:workoutId" component={ShowWorkoutContainer} />

          <ProtectRoute path="/friends" component={DisplayFriends} />

        </Switch>
      </ScrollToTop>


      <Footer />
    </div>
  );
};

export default App;

// <ProtectRoute path="/workouts" component={DisplayWorkouts} />
