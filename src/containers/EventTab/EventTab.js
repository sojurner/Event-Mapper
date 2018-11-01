import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventTab.css';

export class EventTab extends Component {
  render() {
    const { events, showEventInfo, closePopup, handleModalClick } = this.props;
    const eventTab = events.map((event, index) => {
      if (event.name.length > 36) {
        event.name = event.name.slice(0, 36).concat('...');
      }
      return (
        <div
          className="tab-card"
          onMouseEnter={e => showEventInfo(e, event)}
          onMouseLeave={closePopup}
          onClick={event => handleModalClick(event, 'open')}
          key={`tab-${index}`}
        >
          <h1 className="tab-event-name">{event.name}</h1>
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
  events: state.events
});

export default connect(mapStateToProps)(EventTab);
