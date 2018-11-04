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

  handleFilterOptions = () => {
    const { filterDisplay, dateDisplay } = this.state;
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

  render() {
    const { suggestions, location, cursor } = this.state;
    return (
      <form>
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
      </form>
    );
  }
}

FilterBar.propTypes = {
  setEvents: PropTypes.func,
  setUserLocation: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  setUserLocation: coordinates => dispatch(setUserLocation(coordinates)),
  setEvents: events => dispatch(setEvents(events))
});

export default connect(null, mapDispatchToProps)(FilterBar);
