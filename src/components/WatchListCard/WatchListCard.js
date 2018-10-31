import React from 'react';
import PropTypes from 'prop-types';
import './WatchListCard.css';

export const WatchListCard = ({ handleSelection, item, currentItem }) => {
  return (
    <div
      data-id={item.id}
      className={
        currentItem === item.id
          ? 'watch-list-card-container-active'
          : 'watch-list-card-container'
      }
      onClick={handleSelection.bind(null, item)}
    >
      <h1 className="watch-list-card">{item.name}</h1>
      <img
        className="img-card"
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
