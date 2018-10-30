import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WatchListCard.css';

export const WatchListCard = ({ handleSelection, item }) => {
  return (
    <div
      className="watchlist-card-container"
      onClick={e => handleSelection(e, item)}
    >
      <h1>{item.name}</h1>
      <img
        className="watchlist-img"
        alt="shows who is playing the event"
        src={item.img}
      />
    </div>
  );
};

WatchListCard.propTypes = {
  name: PropTypes.string,
  e_id: PropTypes.string,
  img: PropTypes.string,
  date: PropTypes.string,
  url: PropTypes.string,
  venue_name: PropTypes.string,
  address: PropTypes.string
};
