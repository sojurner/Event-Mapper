import React from 'react';
import Map from '../Map/Map';
import NavBar from '../NavBar/NavBar';

export const HomeDisplay = ({ mapType }) => (
  <div>
    <Map mapStyle={mapType} />
  </div>
);
