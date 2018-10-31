import React from 'react';
import PropTypes from 'prop-types';
import './SelectedInfoContainer.css';

export const SelectedInfoContainer = ({ removeEvent, item, weather }) => {
  return weather ? (
    <div className="selected-container">
      <section className="weather-info">
      <img src={require(`../../images/${weather.icon}.png`)} />
        <p className="weather-high">
          {Math.floor(weather.high)}
          °F
        </p>
        <p className="weather-low">
          {Math.floor(weather.low)}
          °F
        </p>
      </section>
      <p className="weather-precip">Chance of Rain: {weather.precip * 100}%</p>
      <p className="selected selected-date">{item.date} @</p>
      <p className="selected selected-venue">{item.venue_name}</p>
      <p className="selected selected-distance">{item.distance}M away</p>
      <p className="selected selected-address">{item.address}</p>
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
