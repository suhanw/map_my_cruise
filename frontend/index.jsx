import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// testing
// import * as RouteApiUtil from './util/routes_api_util';
import * as RouteActions from './actions/routes_actions';
import {clearErrors} from './actions/clear_errors_action';

document.addEventListener('DOMContentLoaded', ()=>{

  // bootstrapping
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: {
        currentUser: window.currentUser,
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  // bootstrapping

  // testing
  window.fetchRoutes = RouteActions.fetchRoutes;
  window.fetchRoute = RouteActions.fetchRoute;
  window.createRoute = RouteActions.createRoute;
  window.updateRoute = RouteActions.updateRoute;
  window.deleteRoute = RouteActions.deleteRoute;
  window.clearErrors = clearErrors;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // testing

  const main = document.getElementById('main');

  ReactDOM.render(
    <Root store={store}/>,
    main
  );

});
