import React from 'react';
import './Event.css';

import { Layer, Feature, Marker } from 'react-mapbox-gl';

export const Event = ({ events, showEventInfo }) => {
  console.log(events);
  return events.map((eve, index) => {
    let coordinates = [eve.venues[0].lng, eve.venues[0].lat];
    return (
      <Marker
        onClick={event => showEventInfo(event, eve.name)}
        key={`event-${index}`}
        coordinates={coordinates}
        anchor="bottom"
      >
        <img
          className="event-marker"
          src="http://landon-homes.net/wp-content/uploads/2015/04/map-pin.png"
        />
      </Marker>
    );
  });
};
