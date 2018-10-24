import React from 'react';

import { Layer, Feature } from 'react-mapbox-gl';

export const Event = ({ events }) => {
  console.log(events);
  return events.map((event, index) => {
    const coordinates = [event.venues[0].lat, event.venues[0].lng];
    return (
      <Layer
        key={`event-${index}`}
        type="symbol"
        id="marker"
        layout={{ 'icon-image': 'marker-15' }}
      >
        <Feature coordinates={coordinates} />
      </Layer>
    );
  });
};
