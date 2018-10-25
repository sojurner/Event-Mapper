import React from 'react';
import { Marker } from 'react-mapbox-gl';
import './Event.css';

export const Event = ({ events }) => {
  return events.map((event, index) => {
    let coordinates = [event.venues[0].lng, event.venues[0].lat];
    return (
      <Marker
        key={`event-${index}`}
        coordinates={coordinates}
        anchor="bottom"
      />
    );
  });
};
