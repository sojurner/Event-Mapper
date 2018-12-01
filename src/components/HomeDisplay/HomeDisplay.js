import React from 'react';
import Map from '../../containers/Map/Map';
import Events from '../../containers/Events/Events';
import FilterBar from '../../containers/FilterBar/FilterBar';
import './HomeDisplay.css';

export const HomeDisplay = () => (
  <div className="home-container">
    <FilterBar />
    <Events />
    <Map />
  </div>
);
