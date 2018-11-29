import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventTab.css';

export class EventTab extends Component {
  setEvLocation = (e, event) => {
    e.preventDefault();
    // this.props.setEventLocation({ latitude: event.lat, longitude: event.lng });
  };

  render() {
    const {
      events,
      showEventInfo,
      closePopup,
      handleModalClick,
      handleFavoriteClick,
      displayTab,
      changeTabDisplay
    } = this.props;
    const eventTab = events.map((event, index) => {
      return (
        <div
          className={!event.favorite ? 'tab-card' : 'tab-card tab-card-listed'}
          onMouseEnter={showEventInfo.bind(null, event.e_id)}
          onMouseLeave={closePopup}
          key={`tab-${index}`}
        >
          <section className="tab-info">
            <i
              className={
                !event.favorite
                  ? 'fas fa-bookmark'
                  : 'fas fa-bookmark active-bookmark'
              }
              onClick={e => handleFavoriteClick(e, event)}
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
          <img alt="event" src={event.img} className="tab-img" />
        </div>
      );
    });
    return (
      <div
        className={displayTab ? 'tab-container' : 'tab-container tab-inactive'}
      >
        {displayTab && <div className="tab-scroll-container">{eventTab}</div>}
        <div
          className="arrow-container"
          onClick={e => changeTabDisplay(e, displayTab)}
        >
          <i
            className={
              displayTab ? `fas fa-chevron-left` : `fas fa-chevron-right`
            }
          />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  events: state.events,
  watchList: state.watchList
});

export default connect(mapStateToProps)(EventTab);
