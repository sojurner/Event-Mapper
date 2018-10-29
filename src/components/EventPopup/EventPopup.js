import React from 'react';
import { Popup } from 'react-mapbox-gl';
import './EventPopup.css';

export const EventPopup = ({ targetEvent }) => {
  let { name, img, lat, lng } = targetEvent;
  const coords = [lng, lat];
  if (name.length > 38) {
    name = name.slice(0, 36).concat('...');
  }
  return (
    <Popup
      coordinates={coords}
      offset={{
        'bottom-left': [12, -38],
        bottom: [0, -38],
        'bottom-right': [-12, -38]
      }}
      className="popup-container"
    >
      <h1 className="popup-name">{name}</h1>
      <img
        src={`${img}`}
        alt="container displaying event info"
        height={200}
        className="popup-img"
      />
    </Popup>
  );
};
