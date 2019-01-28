import React from 'react';
import { connect } from 'react-redux';
import * as invoke from '../../actions';
import './EventTabCard.css';

export class EventTabCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.eventScrollItem
    };

    this.scrollRefs = props.events[props.eventPages.current].map(event =>
      React.createRef()
    );
  }

  componentDidUpdate = () => {
    const { eventScrollItem } = this.props;
    if (eventScrollItem !== this.state.eventId) {
      this.setState({ eventId: eventScrollItem });
      this.scrollIntoView(eventScrollItem);
    }
  };

  scrollIntoView = id => {
    const targetEvent = this.scrollRefs.find(ref => ref.id === id);
    targetEvent.scrollIntoView({ block: 'start', behavior: 'smooth' });
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

  render() {
    const {
      events,
      eventPages,
      changePopupDisplay,
      msgPrompt,
      setModalView,
      handleFavoriteClick
    } = this.props;

    const eventTabCard = events[eventPages.current].map((event, index) => {
      return (
        <div
          id={event.e_id}
          ref={ref => (this.scrollRefs[index] = ref)}
          className={event.favorite ? 'tab-card tab-card-listed' : 'tab-card'}
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
              onClick={event => setModalView(event, true)}
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
  events: state.events,
  eventScrollItem: state.eventScrollItem
});

export const mapDispatchToProps = dispatch => ({
  changePopupDisplay: bool => dispatch(invoke.changePopupDisplay(bool)),
  setMapCenter: coordinates => dispatch(invoke.setMapCenter(coordinates)),
  setZoom: zoomVal => dispatch(invoke.setZoom(zoomVal)),
  setModalView: (event, command) =>
    dispatch(invoke.setModalView(event, command)),
  setTargetEvent: event => dispatch(invoke.setTargetEvent(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventTabCard);
