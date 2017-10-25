import React from 'react';
import {Route} from 'react-router-dom';
import SessionFormContainer from './session_form_container';
import HeaderContainer from './header_container';
import Footer from './footer';

const App = () => {
  return (
    <div>
      <HeaderContainer />
      <Route path="/login" component={SessionFormContainer} />
      <Route path="/signup" component={SessionFormContainer} />
      <Footer />
    </div>
  );
};

export default App;
