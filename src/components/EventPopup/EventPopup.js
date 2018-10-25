import React from 'react';
import { Popup } from 'react-mapbox-gl';
import './EventPopup.css';

export const EventPopup = ({ targetEvent }) => {
  const { name, classifications, url, img, date, venues } = targetEvent;
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
      <h4>Date: {date}</h4>
      <img src={`${img}`} height={100} />
      <p>
        Segment: {classifications[0].segment}, Genre: {classifications[0].genre}
      </p>
      <p>Location: {venues[0].name}</p>
      <p>Address: {venues[0].address}</p>
    </Popup>
  );
};
