import React from 'react';
import { connect } from 'react-redux';

import Map from '../../containers/Map/Map';
import Events from '../../containers/Events/Events';
import FilterBar from '../../containers/FilterBar/FilterBar';

import * as actions from '../../actions';
import { getEvents } from '../../utilities/apiCalls/apiCalls';
import './HomeDisplay.css';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

export class HomeDisplay extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    if (this.props.userLocation) {
      const { latitude, longitude } = this.props.userLocation;
      this.retrieveEvents(latitude, longitude);
    } else {
      this.retrieveEvents(39.7392, -104.9903);
    }
  }

  retrieveEvents = async (lat, lng) => {
    const {
      events,
      setEvents,
      setEventPageInfo,
      setEventLinkInfo
    } = this.props;
    if (!Object.keys(events).length) {
      const results = await getEvents(lat, lng);
      const { events, pageInfo, linkInfo } = results;
      setEvents(events, pageInfo.current);
      setEventPageInfo(pageInfo);
      setEventLinkInfo(linkInfo);
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="home-container">
        <FilterBar />
        {this.state.loading ? (
          <LoadingScreen />
        ) : (
          <>
            <Events />
            <Map />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userLocation: state.userLocation,
  events: state.events
});

const mapDispatchToProps = dispatch => ({
  setEvents: (events, page) => dispatch(actions.setEvents(events, page)),
  setEventLinkInfo: links => dispatch(actions.setEventLinkInfo(links)),
  setEventPageInfo: pages => dispatch(actions.setEventPageInfo(pages))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeDisplay);
