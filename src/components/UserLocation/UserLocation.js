import React from 'react';
import { Marker } from 'react-mapbox-gl';
import './UserLocation.css';

export const UserLocation = ({ lat, lng }) => {
  return (
    <Marker coordinates={[lng, lat]} anchor="bottom">
      <div className="user-location">.</div>
    </Marker>
  );
};
