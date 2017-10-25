import React from 'react';
import {Route} from 'react-router-dom';
import {AuthRoute} from '../util/route_util';
import SessionFormContainer from './session_form_container';
import HeaderContainer from './header_container';
import Footer from './footer';
import ProfileFormContainer from './profile_form_container';

const App = () => {
  return (
    <div>
      <HeaderContainer />
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <Route path="/edit_profile" component={ProfileFormContainer} />
      <Footer />
    </div>
  );
};

export default App;
