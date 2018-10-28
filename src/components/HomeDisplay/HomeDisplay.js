import React from 'react';
import Map from '../Map/Map';
import NavBar from '../NavBar/NavBar';
import FilterBar from '../FilterBar/FilterBar';

export const HomeDisplay = ({ mapType }) => (
  <div>
    <div>
      <FilterBar />
      <Map mapStyle={mapType} />
    </div>
  </div>
);
