import React from 'react';
import Map from '../../containers/Map/Map';
import FilterBar from '../../containers/FilterBar/FilterBar';

export const HomeDisplay = ({ mapType }) => (
  <div>
    <div>
      <FilterBar />
      <Map mapStyle={mapType} />
    </div>
  </div>
);
