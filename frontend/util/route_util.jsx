import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Redirect} from 'react-router-dom';

const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
      !loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    )} />
);

const Protect = ({component: Component, path, exact, loggedIn}) => {
  return (
    <Route path={path} exact={exact} render={(props) => (
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      )} />
    );
};

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser)
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

export const ProtectRoute = withRouter(connect(mapStateToProps, null)(Protect));
