import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Profile from '../Profile/Profile';
import WatchList from '../../containers/WatchList/WatchList';

import { LoginDisplay } from '../LoginDisplay/LoginDisplay';
import { HomeDisplay } from '../HomeDisplay/HomeDisplay';

export const Routes = ({
  user,
  mapType,
  // displaySidebar,
  // stateSidebar,
  // changeMap,
  // logout,
  login,
  redirect
}) => {
  return (
    <div className="App">
      {!window.location.href.includes('app') &&
        redirect === true &&
        user.id && <Redirect to={`/app/${user.id}`} />}
      {window.location.href.includes('app') &&
        redirect === false && <Redirect to={`/`} />}
      <Route
        exact
        path={'/'}
        render={() => {
          return <LoginDisplay login={login} />;
        }}
      />
      <Route
        exact
        path={'/app'}
        render={() => {
          return (
            <HomeDisplay
              changeMap={changeMap}
              displaySidebar={displaySidebar}
              stateSidebar={stateSidebar}
              mapType={mapType}
              logout={logout}
              user={user}
            />
          );
        }}
      />
    </div>
  );
};
