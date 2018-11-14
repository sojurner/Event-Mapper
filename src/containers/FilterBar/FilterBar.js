import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as moment from 'moment';
import cities from '../../data/usCities.json';
import './FilterBar.css';
import { DateFilter } from '../../components/DateFilter/DateFilter';
import { setUserLocation, setEvents } from '../../actions';
import { getEvents, getEventsByDate } from '../../utilities/apiCalls/apiCalls';
export class FilterBar extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      suggestions: [],
      cursor: 0,
      dateDisplay: '',
      filterDisplay: false,
      startDate: null,
      endDate: null
    };
    this.textContent = React.createRef();
  }

  updateValue = event => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      location: value,
      suggestions: this.getSuggestions(value),
      cursor: 0
    });
  };

  escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  getSuggestions = value => {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp('\\b' + escapedValue, 'i');

    return cities.filter(city =>
      regex.test(this.getSuggestionValue(city.city))
    );
  };

  getSuggestionValue = suggestion => {
    return suggestion;
  };

  handleKeyDown = event => {
    const { cursor, suggestions } = this.state;
    if (event.keyCode === 38 && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    }

    if (event.keyCode === 40 && cursor <= suggestions.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    }

    if (event.keyCode === 13) {
      event.preventDefault();
      const nodeList = Array.from(this.textContent.current.childNodes);
      const matchingNode = nodeList.find(
        node => node.className === 'active-suggestion'
      );
      const longitude = matchingNode.getAttribute('lng');
      const latitude = matchingNode.getAttribute('lat');
      this.resetState(latitude, longitude);
    }
  };

  resetState = async (lat, lng) => {
    const response = await getEvents(lat, lng);
    this.props.setEvents(response);
    this.props.setUserLocation({ latitude: lat, longitude: lng });
    this.setState({ location: '', suggestions: [] });
  };

  handleFilterOptions = e => {
    e.preventDefault();
    const { filterDisplay } = this.state;
    if (!filterDisplay) {
      this.setState({ filterDisplay: true, dateDisplay: 'show' });
    } else {
      this.setState({ filterDisplay: false, dateDisplay: '' });
    }
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

  showDate = (e, command) => {
    e.preventDefault();
    const { dateDisplay } = this.state;
    const slashIndex = dateDisplay.indexOf('/');
    command === 'start'
      ? this.setState({ startDate: null })
      : this.setState({ endDate: null });

    if (!dateDisplay.includes('/')) {
      command = `${dateDisplay}/${command}`;
      this.setState({ dateDisplay: command });
      return;
    }
    if (slashIndex !== dateDisplay.length - 1) {
      command = `${dateDisplay.slice(0, slashIndex)}/${command}`;
      this.setState({ dateDisplay: command });
    }
  };

  getEventsByDate = async e => {
    e.preventDefault();
    const { setEvents, userLocation } = this.props;
    const { latitude, longitude } = userLocation;
    const { startDate, endDate } = this.state;
    const result = await getEventsByDate(
      latitude,
      longitude,
      startDate.unix,
      endDate.unix
    );
    setEvents(result);
    await this.setState({
      dateDisplay: '',
      startDate: null,
      endDate: null
    });
  };

  render() {
    const {
      suggestions,
      location,
      cursor,
      dateDisplay,
      startDate,
      endDate
    } = this.state;
    return (
      <form className="filter-form">
        {!dateDisplay && (
          <button
            className="show-date-btn"
            onClick={e => this.handleFilterOptions(e)}
          >
            Filter by Date
          </button>
        )}
        {dateDisplay && (
          <button
            className="hide-date-btn"
            onClick={e => this.handleFilterOptions(e)}
          >
            Hide Filter
          </button>
        )}
        {dateDisplay.includes('show') && (
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            dateDisplay={dateDisplay}
            getStartingDate={this.getStartingDate}
            getEndDate={this.getEndDate}
            showDate={this.showDate}
            getEventsByDate={this.getEventsByDate}
          />
        )}
        <div className="location-input-suggestions">
          <input
            className="location-input"
            type="text"
            placeholder="Search City"
            onChange={event => this.updateValue(event)}
            onKeyDown={this.handleKeyDown}
            value={location}
          />
          <section ref={this.textContent} className={`suggestion-list`}>
            {suggestions.map((city, index) => {
              if (index < 7 && location.length > 1) {
                return (
                  <p
                    className={
                      cursor === index + 1 ? 'active-suggestion' : 'suggestion'
                    }
                    key={`suggestions-${index}`}
                    lng={city.lng}
                    lat={city.lat}
                    onClick={event => this.resetState(city.lat, city.lng)}
                  >
                    {city.city}, {city.state_id}
                  </p>
                );
              }
            })}
          </section>
        </div>
      </form>
    );
  }
}

FilterBar.propTypes = {
  setEvents: PropTypes.func,
  setUserLocation: PropTypes.func
};

export const mapStateToProps = state => ({
  userLocation: state.userLocation
});

export const mapDispatchToProps = dispatch => ({
  setUserLocation: coordinates => dispatch(setUserLocation(coordinates)),
  setEvents: events => dispatch(setEvents(events))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
