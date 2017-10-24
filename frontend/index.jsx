import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// for testing
// import * as APIUtil from './util/session_api_util';
import * as Action from './actions/session_actions';
// for testing

document.addEventListener('DOMContentLoaded', ()=>{

  const store = configureStore();
  const main = document.getElementById('main');

  // for testing
  window.signup = Action.signup;
  window.login = Action.login;
  window.logout = Action.logout;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // for testing

  ReactDOM.render(
    <Root store={store}/>,
    main
  );

});
