import React from 'react';
import PropTypes from 'prop-types';
import './SelectedInfoContainer.css';

export const SelectedInfoContainer = ({ removeEvent, item, weather }) => {
  return weather ? (
    <div className="selected-container">
      <section className="weather-info">
        <div className="weather-container">
          <img
            alt="selected info for event"
            src={require(`../../images/${weather.icon}.png`)}
          />
          <p className="weather-high">
            {Math.floor(weather.high)}
            °F
          </p>
          <p className="weather-low">
            {Math.floor(weather.low)}
            °F
          </p>
          <p className="weather-precip">
            Chance of Rain: {weather.precip * 100}%
          </p>
        </div>
      </section>
      <div className="item-info">
        <p className="selected selected-date">{item.date} @</p>
        <p className="selected selected-venue">{item.venue_name}</p>
        <p className="selected selected-address">{item.address}</p>
        <p className="selected selected-distance">
          Distance: {item.distance} miles
        </p>
        <a className="selected-link" href={item.url}>
          Event Info
        </a>
        <button
          className="selected selected-remove"
          onClick={removeEvent.bind(null, item)}
        >
          Remove from Watchlist
        </button>
      </div>
    </div>
  ) : (
    <img
      alt="selected info for event"
      src={`url(https://steamusercontent-a.akamaihd.net/ugc/82592888811466982/5C5EF117E40A35C384624D15C32BEF0B1F5D8D3C/)`}
    />
  );
};

SelectedInfoContainer.propTypes = {
  removeEvent: PropTypes.func,
  item: PropTypes.object,
  weather: PropTypes.object
};

// {"summary":"Partly cloudy throughout the day.","icon":"partly-cloudy-day","precip":0.1,"high":46.67,"low":26.7}
