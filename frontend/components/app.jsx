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
import RouteForm from './routes/route_form';

const App = () => {
  return (
    <div>
      <HeaderContainer />

      <Route exact path="/" component={Splash} />
      <ProtectRoute exact path="/routes" component={RouteIndexContainer} />
      <Switch>
        <ProtectRoute exact path="/routes/create" component={RouteForm} />
        <ProtectRoute exact path="/routes/:routeId" component={ShowRouteContainer} />
      </Switch>

      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <ProtectRoute path="/edit_profile" component={ProfileFormContainer} />

      <Footer />
    </div>
  );
};

export default App;
