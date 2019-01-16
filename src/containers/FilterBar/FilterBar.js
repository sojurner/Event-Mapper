import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Places from 'places.js';
import './FilterBar.css';

import DateFilter from '../../components/DateFilter/DateFilter';
import * as actions from '../../actions';
import { getEvents } from '../../utilities/apiCalls/apiCalls';
export class FilterBar extends Component {
  constructor() {
    super();
    this.state = {
      filterMode: 'location',
      dateDisplay: '',
      filterDisplay: false
    };
    this.searchInput = React.createRef();
  }

  componentDidMount = () => {
    const options = {
      appId: process.env.REACT_APP_ALG_ID,
      apiKey: process.env.REACT_APP_ALG_SEARCH_KEY,
      container: this.searchInput,
      templates: {
        value: suggestion => {
          return suggestion.name;
        }
      }
    };

    const configueOptions = {
      language: 'en',
      countries: ['us'],
      type: 'city'
    };

    const autoSuggestions = Places(options).configure(configueOptions);

    autoSuggestions.on('change', event => {
      const { name, latlng } = event.suggestion;
      const { lat, lng } = latlng;
      this.resetState(lat, lng, name);
    });
  };

  setDateDisplay = dateDisplay => {
    this.setState({ dateDisplay });
  };

  resetState = async (latitude, longitude, location) => {
    const {
      setEvents,
      setUserLocation,
      setTargetEvent,
      setEventLinkInfo,
      setEventPageInfo,
      setZoom,
      changePopupDisplay,
      setMapCenter
    } = this.props;
    changePopupDisplay(false);
    const response = await getEvents(latitude, longitude);
    const { events, pageInfo, linkInfo } = response;
    setEvents(events, pageInfo.current);
    setEventLinkInfo(linkInfo);
    setEventPageInfo(pageInfo);
    setUserLocation({ latitude, longitude, location });
    setMapCenter({ latitude, longitude });
    setTargetEvent(null);
    setZoom([12]);
  };

  handleFilterOptions = filterMode => {
    this.setState({ filterMode });
  };

  render() {
    const { filterMode, dateDisplay } = this.state;
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

        <input
          placeholder="Where to?"
          className={filterMode === 'location' ? 'algo-places' : 'algolia-hide'}
          ref={ref => {
            this.searchInput = ref;
          }}
        />
        {filterMode === 'date' && (
          <DateFilter
            dateDisplay={dateDisplay}
            setDateDisplay={this.setDateDisplay}
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

export const mapStateToProps = state => ({
  eventPages: state.eventPages
});

export const mapDispatchToProps = dispatch => ({
  setUserLocation: coordinates =>
    dispatch(actions.setUserLocation(coordinates)),
  setTargetEvent: event => dispatch(actions.setTargetEvent(event)),
  setMapCenter: coords => dispatch(actions.setMapCenter(coords)),
  setEvents: events => dispatch(actions.setEvents(events)),
  setEventLinkInfo: links => dispatch(actions.setEventLinkInfo(links)),
  setEventPageInfo: pages => dispatch(actions.setEventPageInfo(pages)),
  setZoom: zoomVal => dispatch(actions.setZoom(zoomVal)),
  changePopupDisplay: bool => dispatch(actions.changePopupDisplay(bool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
