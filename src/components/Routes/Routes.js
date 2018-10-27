import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Map from '../Map/Map';
import Profile from '../Profile/Profile';
import Favorites from '../../containers/Favorites/Favorites';
import { LoginDisplay } from '../LoginDisplay/LoginDisplay';
import { HomeDisplay } from '../HomeDisplay/HomeDisplay';

export const Routes = ({
  user,
  mapType,
  displaySidebar,
  stateSidebar,
  changeMap,
  logout,
  login,
  redirect
}) => {
  console.log(user);
  return (
    <div className="App">
      <Route exact path={`/${user}/favorites`} component={Favorites} />
      <Route exact path={`/${user}/profile`} component={Profile} />
      {redirect === true && <Redirect to={'/app'} />}
      {redirect === false && <Redirect to={'/'} />}
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
            />
          );
        }}
      />
    </div>
  );
};
