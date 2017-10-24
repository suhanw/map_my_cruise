import React from 'react';
import {Route} from 'react-router-dom';
import SessionFormContainer from './session_form_container';

const App = () => {
  return (
    <div>
      <Route path="/login" component={SessionFormContainer} />
      <Route path="/signup" component={SessionFormContainer} />
    </div>
  );
};

export default App;
