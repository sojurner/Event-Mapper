import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import * as call from '../../utilities/apiCalls/apiCalls';
import * as clean from '../../utilities/helpers/helpers';
import * as invoke from '../../actions';
import EventTab from '../EventTab/EventTab';

import { EventModal } from '../../components/EventModal/EventModal';

import './Events.css';

export class Events extends Component {
  constructor() {
    super();
    this.state = {
      targetEvent: {},
      displayTab: true,
      displayPopup: false,
      displayModal: false,
      hoverMessage: '',
      msgPrompt: ''
    };
  }

  async componentDidMount() {
    const { activeUser, setWatchList } = this.props;
    const result = await call.getUserWatchlist(activeUser.id);
    const userWatchList = result.map(item => {
      return { ...item, favorite: true };
    });
    setWatchList(userWatchList);
    this.setEvents(userWatchList);
  }

  setEvents = list => {
    const { events, setWatchEvent } = this.props;
    const setEvent = events.map(event => {
      list.forEach(item => {
        if (item.e_id === event.e_id) {
          event.favorite = !event.favorite;
        }
      });
      return event;
    });
    setWatchEvent(setEvent);
  };

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
          <img
            src={require(`../../images/map-pin.png`)}
            className="map-pin"
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

  handleFavoriteClick = async (e, event) => {
    const {
      activeUser,
      addToWatchList,
      setWatchEvent,
      watchList,
      removeFromWatchlist
    } = this.props;
    if (!event.favorite) {
      setWatchEvent(event);
      const body = clean.eventServerCleaner(activeUser, event);
      const response = await call.setFavorite(
        body.userObj,
        body.eventObj,
        activeUser.id
      );
      if (!response.error) {
        addToWatchList(response.event);
        this.setState({ msgPrompt: 'Event Added!' });
      }
    } else {
      const matchingEvent = watchList.find(item => item.e_id === event.e_id);
      await call.removeFromWatchlist(activeUser.id, matchingEvent.id);
      setWatchEvent(event);
      removeFromWatchlist(matchingEvent);
      this.setState({ msgPrompt: 'Event Removed!' });
    }

    setTimeout(() => {
      this.setState({ msgPrompt: '' });
    }, 2000);
  };

  handleHover = (event, hoverMessage) => {
    event.preventDefault();
    this.setState({ hoverMessage });
  };

  changeTabDisplay = (event, bool) => {
    event.preventDefault();
    this.setState({ displayTab: !bool });
  };

  render() {
    const {
      targetEvent,
      hoverMessage,
      displayPopup,
      displayModal,
      msgPrompt,
      displayTab
    } = this.state;
    const event = this.plotEvents();
    return (
      <div>
        {event}
        {displayPopup && <EventPopup targetEvent={targetEvent} />}
        {msgPrompt && <div className="prompt-msg">{msgPrompt}</div>}
        <EventTab
          changeTabDisplay={this.changeTabDisplay}
          displayTab={displayTab}
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
  events: state.events
});

export const mapDispatchToProps = dispatch => ({
  addToWatchList: event => dispatch(invoke.addToWatchList(event)),
  removeFromWatchlist: event => dispatch(invoke.removeFromWatchlist(event)),
  setWatchEvent: event => dispatch(invoke.setWatchEvent(event)),
  setWatchList: events => dispatch(invoke.setWatchList(events))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
