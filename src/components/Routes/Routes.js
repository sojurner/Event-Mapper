import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { LoginDisplay } from '../LoginDisplay/LoginDisplay';
import HomeDisplay from '../HomeDisplay/HomeDisplay';
import Profile from '../../containers/Profile/Profile';
import WatchList from '../../containers/WatchList/WatchList';

export const Routes = ({ user, loginFail, loginSuccess, redirect }) => {
  return (
    <div className="App">
      {!window.location.href.includes('home') &&
        redirect === true &&
        user.id && <Redirect to={`/home/${user.id}`} />}
      {window.location.href.includes('home') && redirect === false && (
        <Redirect to={`/`} />
      )}
      <Route
        exact
        path={'/'}
        render={() => {
          return (
            <LoginDisplay loginSuccess={loginSuccess} loginFail={loginFail} />
          );
        }}
      />
      {user && (
        <nav>
          <Route exact path={`/home/${user.id}`} component={HomeDisplay} />
          <Route
            exact
            path={`/home/${user.id}/watchlist`}
            render={() => {
              return <WatchList />;
            }}
          />
          <Route path={`/home/${user.id}/profile`} component={Profile} />
        </nav>
      )}
    </div>
  );
};

Routes.propTypes = {
  user: PropTypes.object,
  loginFail: PropTypes.func,
  loginSuccess: PropTypes.func,
  redirect: PropTypes.bool
};
