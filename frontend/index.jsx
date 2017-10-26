import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// testing
import * as RouteApiUtil from './util/routes_api_util';


document.addEventListener('DOMContentLoaded', ()=>{

  // testing
  window.fetchRoutes = RouteApiUtil.fetchRoutes;
  window.fetchRoute = RouteApiUtil.fetchRoute;
  window.createRoute = RouteApiUtil.createRoute;
  window.updateRoute = RouteApiUtil.updateRoute;
  window.deleteRoute = RouteApiUtil.deleteRoute;
  // testing

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

  const main = document.getElementById('main');

  ReactDOM.render(
    <Root store={store}/>,
    main
  );

});
