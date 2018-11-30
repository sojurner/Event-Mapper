import React from 'react';
import PropTypes from 'prop-types';
import './EventModal.css';

export const EventModal = ({ targetEvent }) => {
  const { img, date, venue_name, address } = targetEvent;
  let name = targetEvent.name;
  if (targetEvent.name > 40) {
    name = `${name.slice(0, 40)}...`;
  }
  return (
    <div className="event-modal-container">
      <h1 className="event-name">{name}</h1>
      <section className="event-modal-contents">
        <img
          src={`${img}`}
          alt="current event"
          height={390}
          className="event-img"
        />
        <p className="event-venue">{`${venue_name}`}</p>
        <p className="event-address">{address}</p>
        <h4 className="event-date">{date}</h4>
      </section>
    </div>
  );
};

EventModal.propTypes = {
  targetEvent: PropTypes.object,
  handleFavoriteClick: PropTypes.func,
  handleHover: PropTypes.func,
  hoverMessage: PropTypes.string
};
