import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

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

  const main = document.getElementById('main');

  ReactDOM.render(
    <Root store={store}/>,
    main
  );

});
