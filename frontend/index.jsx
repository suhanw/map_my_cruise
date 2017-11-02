import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// TESTING
// import * as RouteApiUtil from './util/routes_api_util';
// import * as RouteActions from './actions/routes_actions';
import * as WorkoutActions from './actions/workouts_actions';
import {clearErrors} from './actions/clear_actions';
// import * as CommentApiUtil from './util/comments_api_util';
import * as CommentActions from './actions/comments_actions';
import * as FriendActions from './actions/friends_actions';
import * as UserSearchActions from './actions/user_search_actions';
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
  window.searchUsers = UserSearchActions.searchUsers;
  window.fetchFriendStatuses = FriendActions.fetchFriendStatuses;
  window.createFriendStatus = FriendActions.createFriendStatus;
  window.updateFriendStatus = FriendActions.updateFriendStatus;
  window.deleteFriendStatus = FriendActions.deleteFriendStatus;
  window.fetchWorkouts = WorkoutActions.fetchWorkouts;
  window.fetchWorkout = WorkoutActions.fetchWorkout;
  window.createWorkout = WorkoutActions.createWorkout;
  window.updateWorkout = WorkoutActions.updateWorkout;
  window.deleteWorkout = WorkoutActions.deleteWorkout;
  window.createComment = CommentActions.createComment;
  window.deleteComment = CommentActions.deleteComment;
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
