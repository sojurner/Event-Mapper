import React from 'react';
import PropTypes from 'prop-types';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import './SelectedInfoContainer.css';

export const SelectedInfoContainer = ({
  removeEvent,
  item,
  weather,
  selectedImage,
  openNewTab
}) => {
  return weather ? (
    <div
      className="selected-container"
      style={{ backgroundImage: `url(${selectedImage.url})` }}
    >
      <section className="weather-info">
        <div className="weather-container">
          <img
            alt="selected info for event"
            src={require(`../../images/${weather.icon}.png`)}
          />
          <div className="high-low">
            <p className="weather-high">
              {Math.floor(weather.high)}
              °F
            </p>
            <p className="weather-low">
              {Math.floor(weather.low)}
              °F
            </p>
          </div>
          <p className="weather-precip">
            Precip: {Math.floor(weather.precip * 100)}%
          </p>
        </div>
      </section>
      {/* <img
        src={selectedImage.url}
        alt="background for selected event"
        className="selected-background-image"
      /> */}

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
    <LoadingScreen />
  );
};

SelectedInfoContainer.propTypes = {
  removeEvent: PropTypes.func,
  item: PropTypes.object,
  weather: PropTypes.object
};
