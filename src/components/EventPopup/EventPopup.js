import React from 'react';
import { Popup } from 'react-mapbox-gl';
import './EventPopup.css';

export const EventPopup = ({ targetEvent }) => {
  const { name, classifications, img, venues } = targetEvent;
  const { lat, lng } = venues[0];
  const coords = [lng, lat];
  return (
    <Popup
      coordinates={coords}
      offset={{
        'bottom-left': [12, -38],
        bottom: [0, -38],
        'bottom-right': [-12, -38]
      }}
    >
      <h1>Event: {name}</h1>
      <img src={`${img}`} height={200} />
    </Popup>
  );
};
