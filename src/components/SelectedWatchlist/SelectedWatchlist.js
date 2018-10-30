import React from 'react';
import './SelectedWatchlist.css';

export const SelectedWatchlist = ({ item, removeEvent }) => {
  if (item !== {}) {
    return (
      <div className="selected-container">
        <p className="selected selected-date">{item.date}</p>
        <p className="selected selected-url">{item.url}</p>
        <p className="selected selected-distance">{item.distance}m</p>
        <p className="selected selected-date">{item.address}</p>
        <p className="selected selected-date">{item.venue_name}</p>
        <p
          className="selected selected-date"
          onClick={e => removeEvent(e, item)}
        >
          Remove
        </p>
      </div>
    );
  }
};
