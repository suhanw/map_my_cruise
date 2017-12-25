import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

//for testing
import * as LikeApiUtil from './util/likes_api_util';
import {fetchLike, createLike, deleteLike} from './actions/likes_actions';
//for testing

document.addEventListener('DOMContentLoaded', ()=>{
  let store;

  // bootstrapping current user
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

  //for testing
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.createLike = createLike;
  window.deleteLike = deleteLike;
  window.fetchLike = fetchLike;
  //for testing

  const main = document.getElementById('main');

  ReactDOM.render(
    <Root store={store}/>,
    main
  );

});
