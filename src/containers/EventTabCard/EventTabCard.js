import React from 'react';
import { connect } from 'react-redux';

const EventTabCard = ({
  events,
  eventPages,
  showEventInfo,
  closePopup,
  msgPrompt,
  handleModalClick,
  handleFavoriteClick
}) => {
  const eventTabCard = events[eventPages.current].map((event, index) => {
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
};

export const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(EventTabCard);
