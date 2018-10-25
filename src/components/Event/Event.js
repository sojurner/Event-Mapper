import React from 'react';
import './Event.css';

import { Layer, Feature, Marker } from 'react-mapbox-gl';

export const Event = ({ events }) => {
  return events.map((event, index) => {
    let coordinates = [event.venues[0].lng, event.venues[0].lat];
    console.log(coordinates);
    return (
      <Marker
        key={`event-${index}`}
        coordinates={coordinates}
        anchor="bottom"
      />
    );
  });
};
