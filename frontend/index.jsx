import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// TESTING
// import * as RouteApiUtil from './util/routes_api_util';
// import * as RouteActions from './actions/routes_actions';
import * as WorkoutActions from './actions/workouts_actions';
import {clearErrors} from './actions/clear_actions';
// TESTING

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

  // TESTING
  window.fetchWorkouts = WorkoutActions.fetchWorkouts;
  window.fetchWorkout = WorkoutActions.fetchWorkout;
  window.createWorkout = WorkoutActions.createWorkout;
  window.updateWorkout = WorkoutActions.updateWorkout;
  window.deleteWorkout = WorkoutActions.deleteWorkout;
  window.clearErrors = clearErrors;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // TESTING

  const main = document.getElementById('main');

  ReactDOM.render(
    <Root store={store}/>,
    main
  );

});
