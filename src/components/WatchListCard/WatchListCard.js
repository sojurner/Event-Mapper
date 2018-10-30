import React from 'react';
import PropTypes from 'prop-types';
import './WatchListCard.css';

export const WatchListCard = ({ handleSelected, item }) => {
  return (
    <div
      className="watch-list-card-container"
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
  item: PropTypes.object,
  handleSelection: PropTypes.func
};
