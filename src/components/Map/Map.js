import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMapboxGl from 'react-mapbox-gl';
import Events from '../Events/Events';

import { getEvents } from '../../utilities/apiCalls/apiCalls';
import { mbAccessToken as TOKEN } from '../../utilities/apiCalls/apiKeys';

export class Map extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      events: [],
      targetEvent: {}
    };
  }

  componentDidMount() {
    this.setLatLngEvents();
  }

  setLatLngEvents = async () => {
    await navigator.geolocation.getCurrentPosition(async location => {
      const { latitude, longitude } = location.coords;
      const events = await getEvents(latitude, longitude);
      await this.setState({
        latitude,
        longitude,
        events
      });
    });
  };

  render() {
    const Map = ReactMapboxGl({
      accessToken: TOKEN
    });
    const { latitude, longitude, events } = this.state;
    return (
      <Map
        center={[longitude, latitude]}
        zoom={[13]}
        style={`mapbox://styles/mapbox/${this.props.mapStyle}-v9`}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      >
        <Events events={events} />
      </Map>
    );
  }
}

Map.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  events: PropTypes.array
};

const mapDispatchToProps = () => ({});

export default connect(null, mapDispatchToProps)(Map);
