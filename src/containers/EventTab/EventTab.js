import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventTab.css';

export class EventTab extends Component {
  render() {
    const {
      events,
      showEventInfo,
      handleModalClick,
      handleFavoriteClick,
      closePopup,
      displayTab
    } = this.props;
    const eventTab = events.map((event, index) => {
      return (
        <div
          className={!event.favorite ? 'tab-card' : 'tab-card tab-card-listed'}
          onMouseEnter={showEventInfo.bind(null, event.e_id, 'hover')}
          onMouseLeave={closePopup}
          onClick={showEventInfo.bind(null, event.e_id, 'click')}
          key={`tab-${index}`}
        >
          <img alt="event" src={event.img} className="tab-img" />
          <section className="tab-info">
            <i
              className={
                !event.favorite
                  ? 'fas fa-bookmark'
                  : 'fas fa-bookmark active-bookmark'
              }
              onClick={eve => handleFavoriteClick(eve, event)}
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
        <h2 className="event-header-title">
          {this.props.userLocation.hasOwnProperty('location')
            ? this.props.userLocation.location
            : 'Events Near You'}{' '}
          <strong>({events.length})</strong>
        </h2>
        {displayTab && <div className="tab-scroll-container">{eventTab}</div>}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  userLocation: state.userLocation,
  events: state.events,
  watchList: state.watchList
});

export default connect(mapStateToProps)(EventTab);
