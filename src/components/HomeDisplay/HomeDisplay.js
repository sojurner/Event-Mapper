import React from 'react';
import Map from '../../containers/Map/Map';
import Events from '../../containers/Events/Events';
import FilterBar from '../../containers/FilterBar/FilterBar';

export const HomeDisplay = () => (
  <div>
    <div>
      <FilterBar />
      <Events />
      <Map />
    </div>
  </div>
);
