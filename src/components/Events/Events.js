import React, { Component } from 'react';
import { Marker } from 'react-mapbox-gl';
import Modal from 'react-responsive-modal';

import { EventModal } from '../EventModal/EventModal';
import { EventPopup } from '../EventPopup/EventPopup';

import './Events.css';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      targetEvent: {},
      displayPopup: false,
      displayModal: false
    };
  }

  plotEvents = () => {
    const { events } = this.props;
    return events.map((eve, index) => {
      let coordinates = [eve.lng, eve.lat];
      return (
        <Marker
          onClick={event => this.handleModalClick(event, 'open')}
          onMouseEnter={event => this.showEventInfo(event, eve)}
          onMouseLeave={this.closePopup}
          key={`event-${index}`}
          coordinates={coordinates}
          anchor="bottom"
        >
          <img
            className="event-marker"
            src="http://landon-homes.net/wp-content/uploads/2015/04/map-pin.png"
          />
        </Marker>
      );
    });
  };

  showEventInfo = (event, targetEvent) => {
    event.preventDefault();
    this.setState({ targetEvent, displayPopup: true });
  };

  closePopup = () => {
    this.setState({ displayPopup: false });
  };

  handleModalClick = (event, order) => {
    event.preventDefault();
    order === 'open'
      ? this.setState({ displayModal: true })
      : this.setState({ displayModal: false });
  };

  handleFavoriteClick = () => {
    const { targetEvent } = this.state;
    const favoritedEvent = { ...targetEvent, favorite: !targetEvent.favorite };
    this.setState({ targetEvent: favoritedEvent });
  };

  render() {
    const { targetEvent } = this.state;
    const event = this.plotEvents();
    return (
      <div>
        {event}
        {this.state.displayPopup && <EventPopup targetEvent={targetEvent} />}
        <Modal
          open={this.state.displayModal}
          onClose={event => this.handleModalClick(event)}
          center
        >
          <EventModal
            handleFavoriteClick={this.handleFavoriteClick}
            targetEvent={targetEvent}
          />
        </Modal>
      </div>
    );
  }
}

export default Events;
