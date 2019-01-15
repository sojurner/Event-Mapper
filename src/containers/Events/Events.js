import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import * as call from '../../utilities/apiCalls/apiCalls';
import * as invoke from '../../actions';
import EventTab from '../EventTab/EventTab';

import { EventModal } from '../../components/EventModal/EventModal';

import './Events.css';

export class Events extends Component {
  constructor() {
    super();
    this.state = {
      displayModal: false,
      hoverMessage: ''
    };
  }

  async componentDidMount() {
    if (!this.props.watchList.length) {
      const { activeUser, setWatchList } = this.props;
      const result = await call.getUserWatchlist(activeUser.id);
      const userWatchList = result.map(item => {
        return { ...item, favorite: true };
      });
      setWatchList(userWatchList);
      this.setEvents(userWatchList);
    }
  }

  setEvents = list => {
    const { events, setEvents, eventPages } = this.props;
    const setEvent = events[eventPages.current].map(event => {
      list.forEach(item => {
        if (item.e_id === event.e_id) {
          event.favorite = !event.favorite;
        }
      });
      return event;
    });

    setEvents(setEvent, eventPages.current);
  };

  showEventInfo = (id, command) => {
    const {
      setTargetEvent,
      changePopupDisplay,
      setZoom,
      setMapCenter,
      events,
      eventPages
    } = this.props;
    const targetEvent = events[eventPages.current].find(
      event => event.e_id === id
    );
    setTargetEvent(targetEvent);
    if (command === 'click') {
      const coordinates = {
        latitude: targetEvent.lat,
        longitude: targetEvent.lng
      };
      setMapCenter(coordinates);
      setZoom([14]);
    }
    changePopupDisplay(true);
  };

  closePopup = () => {
    this.props.changePopupDisplay(false);
  };

  handleModalClick = (event, order) => {
    event.stopPropagation();
    order === 'open'
      ? this.setState({ displayModal: true })
      : this.setState({ displayModal: false });
  };

  handleHover = (event, hoverMessage) => {
    event.preventDefault();
    this.setState({ hoverMessage });
  };

  render() {
    const { hoverMessage, displayModal } = this.state;

    const { targetEvent } = this.props;
    return (
      <div className="events-container">
        <EventTab
          changeTabDisplay={this.changeTabDisplay}
          handleFavoriteClick={this.handleFavoriteClick}
          showEventInfo={this.showEventInfo}
          closePopup={this.closePopup}
          handleModalClick={this.handleModalClick}
        />
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
  events: state.events,
  eventPages: state.eventPages,
  targetEvent: state.targetEvent
});

export const mapDispatchToProps = dispatch => ({
  setEvents: (events, page) => dispatch(invoke.setEvents(events, page)),
  setWatchList: events => dispatch(invoke.setWatchList(events)),
  setTargetEvent: event => dispatch(invoke.setTargetEvent(event)),
  setMapCenter: coordinates => dispatch(invoke.setMapCenter(coordinates)),
  changePopupDisplay: bool => dispatch(invoke.changePopupDisplay(bool)),
  setZoom: zoomVal => dispatch(invoke.setZoom(zoomVal))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
