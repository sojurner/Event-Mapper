import React from 'react';
import PropTypes from 'prop-types';
import './EventModal.css';

export const EventModal = ({ targetEvent }) => {
  const { img, date, venue_name, address, url } = targetEvent;
  let name = targetEvent.name;
  if (targetEvent.name > 40) {
    name = `${name.slice(0, 40)}...`;
  }
  return (
    <div className="event-modal-container">
      <h1 className="event-name">{name}</h1>
      <img
        src={`${img}`}
        alt="current event"
        height={390}
        className="event-img"
      />

      <section className="event-modal-contents">
        <p className="event-venue">{`${venue_name}`}</p>
        <div className="modal-link-details">
          <section className="modal-address-date">
            <p className="event-address">{address}</p>
            <h4 className="event-date">{date}</h4>
          </section>
          <a
            className="modal-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Event Info
          </a>
        </div>
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
