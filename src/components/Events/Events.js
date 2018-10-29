import React, { Component } from 'react';
import { Marker } from 'react-mapbox-gl';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import * as call from '../../utilities/apiCalls/apiCalls';
import * as clean from '../../utilities/helpers/helpers';
import * as invoke from '../../actions';

import { EventModal } from '../EventModal/EventModal';
import { EventPopup } from '../EventPopup/EventPopup';

import './Events.css';

export class Events extends Component {
  constructor() {
    super();
    this.state = {
      targetEvent: {},
      displayPopup: false,
      displayModal: false,
      hoverMessage: ''
    };
  }

  plotEvents = () => {
    const { events } = this.props;
    return events.map((eve, index) => {
      let coordinates = [eve.lng, eve.lat];
      return (
        <Marker
          key={`event-${index}`}
          coordinates={coordinates}
          anchor="bottom"
        >
          <i
            class="fas fa-map-pin"
            onClick={event => this.handleModalClick(event, 'open')}
            onMouseEnter={event => this.showEventInfo(event, eve)}
            onMouseLeave={this.closePopup}
          />
        </Marker>
      );
    });
  };

  showEventInfo = (event, targEvent) => {
    event.preventDefault();
    const targetEvent = this.props.events.find(
      eve => eve.e_id === targEvent.e_id
    );
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

  handleFavoriteClick = async () => {
    const {
      activeUser,
      addToWatchList,
      setWatchEvent,
      watchList,
      removeFromWatchlist
    } = this.props;
    const { targetEvent } = this.state;
    let watchListEvent;
    if (!targetEvent.favorite) {
      setWatchEvent(targetEvent);
      const body = clean.eventServerCleaner(activeUser, targetEvent);
      watchListEvent = { ...targetEvent, favorite: true };
      this.setState({ targetEvent: watchListEvent });
      const response = await call.setFavorite(
        body.userObj,
        body.eventObj,
        activeUser.id
      );
      if (!response.error) addToWatchList(response.event);
    } else {
      const matchingEvent = watchList.find(
        item => item.e_id === targetEvent.e_id
      );
      await call.removeFromWatchlist(activeUser.id, matchingEvent.id);
      removeFromWatchlist(matchingEvent);
      watchListEvent = { ...targetEvent, favorite: false };
      this.setState({ targetEvent: watchListEvent });
    }
  };

  handleHover = (event, hoverMessage) => {
    event.preventDefault();
    this.setState({ hoverMessage });
  };

  render() {
    const {
      targetEvent,
      hoverMessage,
      displayPopup,
      displayModal
    } = this.state;
    const event = this.plotEvents();
    return (
      <div>
        {event}
        {displayPopup && <EventPopup targetEvent={targetEvent} />}
        <Modal
          open={displayModal}
          onClose={event => this.handleModalClick(event)}
          center
        >
          <EventModal
            handleHover={this.handleHover}
            hoverMessage={hoverMessage}
            handleFavoriteClick={this.handleFavoriteClick}
            targetEvent={targetEvent}
          />
        </Modal>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  activeUser: state.activeUser,
  watchList: state.watchList,
  events: state.events
});

export const mapDispatchToProps = dispatch => ({
  addToWatchList: event => dispatch(invoke.addToWatchList(event)),
  removeFromWatchlist: event => dispatch(invoke.removeFromWatchlist(event)),
  setWatchEvent: event => dispatch(invoke.setWatchEvent(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
