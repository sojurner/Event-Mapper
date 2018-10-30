import React from 'react';
import PropTypes from 'prop-types';
import './SelectedInfoContainer.css';

export const SelectedInfoContainer = (props) => {
  const {name, e_id, date, url, venue_name, address} = props.displayInfo;
  const toggledItems = () => {
    if (e_id) {
      return (
        <div className='selected-container'>
          <h1>{name}</h1>
          <h2>Event Date: {date}</h2>
          <h2>Venue: {venue_name}</h2>
          <h2>Location: {address}</h2>
          <a href={url}>Event Info</a>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  };
  
  return (
    <div className='selected-wrapper'>
      {toggledItems()}
    </div>
  );
};

SelectedInfoContainer.propTypes = {
  displayInfo: PropTypes.object
};
