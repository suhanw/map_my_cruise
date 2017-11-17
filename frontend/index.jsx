import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// to delete
// import * as ActivitiesApiUtil from './util/activities_api_util';
import * as ActivitiesActions from './actions/activities_actions';
// to delete

document.addEventListener('DOMContentLoaded', ()=>{

  // bootstrapping current user
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
  // bootstrapping current user

  // to delete
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchActivities = ActivitiesActions.fetchActivities;
  // to delete

  const main = document.getElementById('main');

  ReactDOM.render(
    <Root store={store}/>,
    main
  );

});
