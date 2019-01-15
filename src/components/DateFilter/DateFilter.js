import React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { setEvents, setEventPageInfo, setEventLinkInfo } from '../../actions';
import { getEventsByDate } from '../../utilities/apiCalls/apiCalls';

import Calendar from 'react-calendar';

import './DateFilter.css';

class DateFilter extends React.Component {
  state = {
    startDate: null,
    endDate: null
  };

  getStartingDate = value => {
    const date = moment(value).format('ll');
    const unix = moment(value)
      .utc()
      .format();
    this.setState({
      startDate: { unix, date }
    });
  };

  getEndDate = value => {
    const date = moment(value).format('ll');
    const unix = moment(value)
      .utc()
      .format();

    this.setState({
      endDate: { unix, date }
    });
  };

  showDate = command => {
    const { dateDisplay, setDateDisplay } = this.props;
    const slashIndex = dateDisplay.indexOf('/');
    command === 'start'
      ? this.setState({ startDate: null })
      : this.setState({ endDate: null });

    if (!dateDisplay.includes('/')) {
      command = `${dateDisplay}/${command}`;
      setDateDisplay(command);
      return;
    }
    if (slashIndex !== dateDisplay.length - 1) {
      command = `${dateDisplay.slice(0, slashIndex)}/${command}`;
      setDateDisplay(command);
    }
  };

  getEventsByDate = async event => {
    event.preventDefault();
    const {
      setEvents,
      setEventLinkInfo,
      setEventPageInfo,
      userLocation,
      setDateDisplay
    } = this.props;
    const { latitude, longitude } = userLocation;
    const { startDate, endDate } = this.state;
    const results = await getEventsByDate(
      latitude,
      longitude,
      startDate.unix,
      endDate.unix
    );
    const { events, pageInfo, linkInfo } = results;
    setEvents(events, pageInfo.current);
    setEventPageInfo(pageInfo);
    setEventLinkInfo(linkInfo);
    await this.setState({
      startDate: null,
      endDate: null
    });
    setDateDisplay('');
  };

  render() {
    const { startDate, endDate } = this.state;
    const { dateDisplay } = this.props;

    return (
      <div className="filter-menu">
        <div className="start-end-container">
          <section className="start-date-section">
            <h5
              className="start-date-btn"
              onClick={this.showDate.bind(null, 'start')}
            >
              Start Date:
            </h5>
            {startDate && (
              <h5 className="start-date-input"> {startDate.date}</h5>
            )}
          </section>
          <section className="end-date-section">
            <h5
              className="end-date-btn "
              onClick={this.showDate.bind(null, 'end')}
            >
              End Date:
            </h5>
            {endDate && <h5 className="end-date-input"> {endDate.date}</h5>}
          </section>
        </div>
        <div className="calendar-container">
          {dateDisplay.includes('start') && !startDate && (
            <Calendar
              className="start-date"
              calendarType={`ISO 8601`}
              onChange={this.getStartingDate}
            />
          )}
          {dateDisplay.includes('end') && !endDate && (
            <Calendar
              className="end-date"
              calendarType={`ISO 8601`}
              onChange={this.getEndDate}
            />
          )}
          {startDate && endDate && (
            <button
              className="apply-btn"
              onClick={event => this.getEventsByDate(event)}
            >
              Apply Filter
            </button>
          )}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  userLocation: state.userLocation
});

export const mapDispatchToProps = dispatch => ({
  setEvents: events => dispatch(setEvents(events)),
  setEventPageInfo: pages => dispatch(setEventPageInfo(pages)),
  setEventLinkInfo: links => dispatch(setEventLinkInfo(links))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateFilter);
