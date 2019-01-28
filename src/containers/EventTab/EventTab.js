import React, { Component } from 'react';
import { connect } from 'react-redux';

import EventTabCard from '../EventTabCard/EventTabCard';
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
    const { eventPages, userLocation } = this.props;
    const { msgPrompt, displayTab } = this.state;

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
        <EventTabCard
          msgPrompt={msgPrompt}
          handleFavoriteClick={this.handleFavoriteClick}
          eventPages={eventPages}
        />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  userLocation: state.userLocation,
  activeUser: state.activeUser,
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
