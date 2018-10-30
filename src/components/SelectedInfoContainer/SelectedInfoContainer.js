import React from 'react';
import PropTypes from 'prop-types';
import './SelectedInfoContainer.css';

export const SelectedInfoContainer = ({ removeEvent, item, weather }) => {
  return (
    <div className="selected-container">
      <img src={require(`../../images/${weather.icon}.png`)} />
      <p className="selected selected-date">{item.date}</p>
      <p className="selected selected-distance">{item.distance}m</p>
      <p className="selected selected-date">{item.address}</p>
      <p className="selected selected-date">{item.venue_name}</p>
      <a href={item.url}>Event Info</a>
      <button
        className="selected selected-date"
        onClick={removeEvent.bind(null, item)}
      >
        Remove from Watchlist
      </button>
    </div>
  );
};

SelectedInfoContainer.propTypes = {
  displayInfo: PropTypes.object
};
