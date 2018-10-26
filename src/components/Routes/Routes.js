import React from 'react';
import { Route } from 'react-router-dom';

import Map from '../Map/Map';
import Profile from '../Profile/Profile';
import Favorites from '../../containers/Favorites/Favorites';

export const Routes = ({ gid, mapStyle }) => {
  console.log(gid);
  return (
    <div className="main-nav">
      <Route
        exact
        path={`/`}
        render={() => {
          return <Map mapStyle={mapStyle} />;
        }}
      />
      <Route exact path={`/${gid}/favorites`} component={Favorites} />
      <Route exact path={`/${gid}/profile`} component={Profile} />
    </div>
  );
};
