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
      let coordinates = [eve.venues[0].lng, eve.venues[0].lat];
      return (
        <Marker
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

  render() {
    const { targetEvent } = this.state;
    const event = this.plotEvents();
    return (
      <div>
        {event}
        {this.state.displayPopup && <EventPopup targetEvent={targetEvent} />}
      </div>
    );
  }
}

export default Events;
