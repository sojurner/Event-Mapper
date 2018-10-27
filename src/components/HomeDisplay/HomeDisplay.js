import React from 'react';
import Map from '../Map/Map';
import NavBar from '../NavBar/NavBar';

export const HomeDisplay = ({
  changeMap,
  displaySidebar,
  stateSidebar,
  mapType,
  logout,
  user
}) => (
  <div>
    <Map mapStyle={mapType} />
  </div>
);
