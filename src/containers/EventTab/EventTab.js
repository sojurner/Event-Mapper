import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventTab.css';

export class EventTab extends Component {
  render() {
    const {
      events,
      showEventInfo,
      closePopup,
      handleModalClick,
      handleFavoriteClick
    } = this.props;
    const eventTab = events.map((event, index) => {
      if (event.name.length > 36) {
        event.name = event.name.slice(0, 29).concat('...');
      }
      return (
        <div
          className="tab-card"
          onMouseEnter={e => showEventInfo(e, event)}
          onMouseLeave={closePopup}
          key={`tab-${index}`}
        >
          <section className="tab-info">
            <i
              className="far fa-eye"
              onClick={event => handleModalClick(event, 'open')}
            />
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
            <p className="tab-contents tab-address">{event.address}</p>
          </section>
          <img alt="event" src={event.img} className="tab-img" />
        </div>
      );
    });
    return (
      <div className="tab-container">
        <div className="tab-scroll-container">{eventTab}</div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  events: state.events,
  watchList: state.watchList
});

export default connect(mapStateToProps)(EventTab);
