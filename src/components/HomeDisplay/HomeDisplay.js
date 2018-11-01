import React from 'react';
import Map from '../../containers/Map/Map';
import FilterBar from '../../containers/FilterBar/FilterBar';

export const HomeDisplay = () => (
  <div>
    <div>
      <FilterBar />
      <Map />
    </div>
  </div>
);
