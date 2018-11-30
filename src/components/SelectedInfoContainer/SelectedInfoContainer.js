import React from 'react';
import PropTypes from 'prop-types';
import './SelectedInfoContainer.css';

export const SelectedInfoContainer = ({
  removeEvent,
  item,
  weather,
  selectedImage,
  openNewTab
}) => {
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
            Chance of Rain: {Math.floor(weather.precip * 100)}%
          </p>
        </div>
      </section>
      <img src={selectedImage.url} className="selected-background-image" />

      <div className="item-info">
        <p className="selected selected-title">{item.name}</p>
        <p className="selected selected-date">
          {item.date} @ {item.venue_name}
        </p>
        <p className="selected selected-address">{item.address}</p>
        <p className="selected selected-distance">
          Distance: {item.distance} miles
        </p>
        <div>
          <p
            className="selected-link"
            onClick={openNewTab.bind(null, item.url)}
          >
            Event Info
          </p>
          <button
            className="selected selected-remove"
            onClick={removeEvent.bind(null, item)}
          >
            Remove from Watchlist
          </button>
        </div>
      </div>
    </div>
  ) : (
    <img
      className="loading-gif"
      alt="Loading..."
      src={require(`../../images/loading.gif`)}
    />
  );
};

SelectedInfoContainer.propTypes = {
  removeEvent: PropTypes.func,
  item: PropTypes.object,
  weather: PropTypes.object
};
