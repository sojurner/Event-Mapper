import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cities from '../../data/usCities.json';
import './FilterBar.css';

import { Search } from '../../components/Search/Search';
import DateFilter from '../../components/DateFilter/DateFilter';
import * as actions from '../../actions';
import { getEvents } from '../../utilities/apiCalls/apiCalls';
export class FilterBar extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      filterMode: 'location',
      suggestions: [],
      cursor: 0,
      dateDisplay: '',
      filterDisplay: false
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
      if (matchingNode) {
        const longitude = matchingNode.getAttribute('lng');
        const latitude = matchingNode.getAttribute('lat');
        this.resetState(latitude, longitude);
      } else {
        return;
      }
    }
  };

  setDateDisplay = dateDisplay => {
    this.setState({ dateDisplay });
  };

  resetState = async (lat, lng) => {
    const {
      setEvents,
      setUserLocation,
      setTargetEvent,
      setZoom,
      changePopupDisplay,
      setMapCenter
    } = this.props;
    changePopupDisplay(false);
    const response = await getEvents(lat, lng);
    setEvents(response);
    setUserLocation({ latitude: lat, longitude: lng });
    setMapCenter({ latitude: lat, longitude: lng });
    setTargetEvent(null);
    setZoom([12]);
    this.setState({ location: '', suggestions: [] });
  };

  handleFilterOptions = filterMode => {
    this.setState({ filterMode });
  };

  render() {
    const {
      suggestions,
      location,
      cursor,
      filterMode,
      dateDisplay
    } = this.state;
    return (
      <form className="filter-form">
        <div className="filter-icons">
          <i
            className={
              filterMode === 'location'
                ? 'fas fa-search-location filter-active'
                : 'fas fa-search-location'
            }
            onClick={this.handleFilterOptions.bind(null, 'location')}
          />
          <i
            className={
              filterMode === 'date'
                ? 'fas fa-calendar-alt filter-active'
                : 'fas fa-calendar-alt'
            }
            onClick={this.handleFilterOptions.bind(null, 'date')}
          />
        </div>
        {filterMode === 'date' && (
          <DateFilter
            dateDisplay={dateDisplay}
            setDateDisplay={this.setDateDisplay}
          />
        )}
        {filterMode === 'location' && (
          <Search
            updateValue={this.updateValue}
            handleKeyDown={this.handleKeyDown}
            textContent={this.textContent}
            suggestions={suggestions}
            location={location}
            cursor={cursor}
            resetState={this.resetState}
          />
        )}
      </form>
    );
  }
}

FilterBar.propTypes = {
  setEvents: PropTypes.func,
  setUserLocation: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  setUserLocation: coordinates =>
    dispatch(actions.setUserLocation(coordinates)),
  setTargetEvent: event => dispatch(actions.setTargetEvent(event)),
  setMapCenter: coords => dispatch(actions.setMapCenter(coords)),
  setEvents: events => dispatch(actions.setEvents(events)),
  setZoom: zoomVal => dispatch(actions.setZoom(zoomVal)),
  changePopupDisplay: bool => dispatch(actions.changePopupDisplay(bool))
});

export default connect(
  null,
  mapDispatchToProps
)(FilterBar);
