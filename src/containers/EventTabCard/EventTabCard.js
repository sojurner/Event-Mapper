import React from 'react';
import { connect } from 'react-redux';
import * as invoke from '../../actions';

class EventTabCard extends React.Component {
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

  render() {
    const {
      events,
      eventPages,
      changePopupDisplay,
      msgPrompt,
      handleModalClick,
      handleFavoriteClick
    } = this.props;

    const eventTabCard = events[eventPages.current].map((event, index) => {
      return (
        <div
          className={!event.favorite ? 'tab-card' : 'tab-card tab-card-listed'}
          onMouseEnter={this.showEventInfo.bind(null, event.e_id, 'hover')}
          onMouseLeave={() => changePopupDisplay(false)}
          onClick={this.showEventInfo.bind(null, event.e_id, 'click')}
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
    return <div className="tab-scroll-container">{eventTabCard}</div>;
  }
}

export const mapStateToProps = state => ({
  events: state.events
});

export const mapDispatchToProps = dispatch => ({
  changePopupDisplay: bool => dispatch(invoke.changePopupDisplay(bool)),
  setMapCenter: coordinates => dispatch(invoke.setMapCenter(coordinates)),
  setZoom: zoomVal => dispatch(invoke.setZoom(zoomVal)),
  setTargetEvent: event => dispatch(invoke.setTargetEvent(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventTabCard);
