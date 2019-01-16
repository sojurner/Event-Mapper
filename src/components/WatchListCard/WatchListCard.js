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
      style={{ backgroundImage: `url(${item.img})` }}
      onClick={handleSelection.bind(null, item)}
    >
      <h1
        className={
          currentItem === item.id
            ? 'watch-list-card-title-active'
            : 'watch-list-card-title'
        }
      >
        {item.name}
      </h1>
    </div>
  );
};

WatchListCard.propTypes = {
  item: PropTypes.object,
  handleSelection: PropTypes.func,
  currentItem: PropTypes.number
};
