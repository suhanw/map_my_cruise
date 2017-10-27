import React from 'react';
import {Route} from 'react-router-dom';
import {AuthRoute, ProtectRoute} from '../util/route_util';
import SessionFormContainer from './session_form_container';
import HeaderContainer from './header_container';
import Splash from './splash';
import Footer from './footer';
import ProfileFormContainer from './profile_form_container';
import RouteIndexContainer from './routes/route_index_container';
import RouteShowContainer from './routes/route_show_container';

const App = () => {
  return (
    <div>
      <HeaderContainer />
      <Route exact path="/" component={Splash} />
      <ProtectRoute exact path="/routes/:routeId" component={RouteShowContainer} />
      <ProtectRoute exact path="/routes" component={RouteIndexContainer} />
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <ProtectRoute path="/edit_profile" component={ProfileFormContainer} />
      <Footer />
    </div>
  );
};

export default App;
