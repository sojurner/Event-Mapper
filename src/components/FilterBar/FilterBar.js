import React, { Component } from 'react';
import { connect } from 'react-redux';
import cities from '../../data/usCities.json';

import './FilterBar.css';
import { setUserLocation, setEvents } from '../../actions';
import { getEvents } from '../../utilities/apiCalls/apiCalls';

export class FilterBar extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      suggestions: [],
      cursor: 0
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

  render() {
    const { suggestions, location, cursor } = this.state;
    return (
      <form>
        <input
          className="location-input"
          type="text"
          placeholder="Search City"
          onChange={e => this.updateValue(e)}
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
                  onClick={e => this.resetState(city.lat, city.lng)}
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

export const mapDispatchToProps = dispatch => ({
  setUserLocation: coordinates => dispatch(setUserLocation(coordinates)),
  setEvents: events => dispatch(setEvents(events))
});

export default connect(
  null,
  mapDispatchToProps
)(FilterBar);
