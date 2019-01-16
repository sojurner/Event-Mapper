import React, { Component } from 'react';
import { connect } from 'react-redux';

import EventNavigation from '../EventNavigation/EventNavigation';
import { eventServerCleaner } from '../../utilities/helpers/helpers';
import * as call from '../../utilities/apiCalls/apiCalls';
import * as invoke from '../../actions';

import './EventTab.css';

export class EventTab extends Component {
  constructor() {
    super();
    this.state = {
      displayTab: true,
      msgPrompt: { id: null, msg: '' }
    };
  }

  toggleTab = () => {
    this.setState(prevState => ({
      displayTab: !prevState.displayTab
    }));
  };

  handleFavoriteClick = async (eve, event) => {
    eve.stopPropagation();
    const {
      activeUser,
      addToWatchList,
      setWatchEvent,
      eventPages,
      watchList,
      removeFromWatchlist
    } = this.props;
    if (!event.favorite) {
      event.favorite = true;
      setWatchEvent(event, eventPages.current);
      const body = eventServerCleaner(activeUser, event);
      const response = await call.setFavorite(
        body.userObj,
        body.eventObj,
        activeUser.id
      );
      if (!response.error) {
        addToWatchList(response.event);
        this.setState({ msgPrompt: { id: event.e_id, msg: 'Event Saved!' } });
      }
    } else {
      event.favorite = false;
      const matchingEvent = watchList.find(item => item.e_id === event.e_id);
      await call.removeFromWatchlist(activeUser.id, matchingEvent.id);
      setWatchEvent(event, eventPages.current);
      removeFromWatchlist(matchingEvent);
      this.setState({ msgPrompt: { id: event.e_id, msg: 'Event Removed!' } });
    }

    setTimeout(() => {
      this.setState({ msgPrompt: {} });
    }, 2000);
  };

  render() {
    const {
      events,
      showEventInfo,
      handleModalClick,
      eventPages,
      closePopup,
      userLocation
    } = this.props;

    const { msgPrompt, displayTab } = this.state;

    const eventTab = events[eventPages.current].map((event, index) => {
      return (
        <div
          className={!event.favorite ? 'tab-card' : 'tab-card tab-card-listed'}
          onMouseEnter={showEventInfo.bind(null, event.e_id, 'hover')}
          onMouseLeave={closePopup}
          onClick={showEventInfo.bind(null, event.e_id, 'click')}
          key={`tab-${index}`}
        >
          {msgPrompt.id === event.e_id && (
            <div className="prompt-msg">{msgPrompt.msg}</div>
          )}

          <img alt="event" src={event.img} className="tab-img" />
          <section className="tab-info">
            <i
              className={
                !event.favorite
                  ? 'fas fa-bookmark'
                  : 'fas fa-bookmark active-bookmark'
              }
              onClick={eve => this.handleFavoriteClick(eve, event)}
            />
            <h1 className="tab-contents tab-event-name">{event.name}</h1>
            <p className="tab-contents tab-date">{event.date}</p>
            <p
              className="view-modal"
              onClick={event => handleModalClick(event, 'open')}
            >
              View Details
            </p>
          </section>
        </div>
      );
    });
    return (
      <div
        className={displayTab ? 'tab-container' : 'tab-container tab-inactive'}
      >
        <div onClick={this.toggleTab} className="chevron-left-right-container">
          <i
            className={
              displayTab
                ? 'fas fa-chevron-circle-left'
                : 'fas fa-chevron-circle-right'
            }
          />
        </div>
        <h2 className="event-header-title">
          {userLocation.hasOwnProperty('location')
            ? userLocation.location
            : 'Events Near You'}{' '}
          <strong>({eventPages.count})</strong>
        </h2>
        <EventNavigation />
        <div className="tab-scroll-container">{eventTab}</div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  userLocation: state.userLocation,
  activeUser: state.activeUser,
  eventsPage: state.eventsPage,
  events: state.events,
  eventPages: state.eventPages,
  watchList: state.watchList
});

export const mapDispatchToProps = dispatch => ({
  removeFromWatchlist: event => dispatch(invoke.removeFromWatchlist(event)),
  addToWatchList: event => dispatch(invoke.addToWatchList(event)),
  setWatchEvent: (event, page) => dispatch(invoke.setWatchEvent(event, page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventTab);
