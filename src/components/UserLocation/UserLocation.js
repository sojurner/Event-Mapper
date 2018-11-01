import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-mapbox-gl';
import './UserLocation.css';

export const UserLocation = ({ lat, lng }) => {
  return (
    <Marker coordinates={[lng, lat]} anchor="bottom">
      <div className="user-location">.</div>
    </Marker>
  );
};

UserLocation.propTypes = {
  lat: PropTypes.number, 
  lng: PropTypes.number
};