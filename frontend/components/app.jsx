import React from 'react';
import {Route} from 'react-router-dom';
import SessionFormContainer from './session_form_container';
import HeaderContainer from './header_container';
import Footer from './footer';
import {AuthRoute} from '../util/route_util';

const App = () => {
  return (
    <div>
      <HeaderContainer />
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <Footer />
    </div>
  );
};

export default App;
