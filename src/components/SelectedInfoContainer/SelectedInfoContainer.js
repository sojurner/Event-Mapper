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
  ) : (
    <img
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
