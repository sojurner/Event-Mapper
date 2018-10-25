import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMapboxGl from 'react-mapbox-gl';
import Events from '../Events/Events';

import { getEvents } from '../../utilities/apiCalls/apiCalls';
import { mbAccessToken as TOKEN } from '../../utilities/apiCalls/apiKeys';
import { throws } from 'assert';

export class Map extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      events: []
    };
  }

  componentDidMount() {
    this.setLatLngEvents();
  }

  setLatLngEvents = async () => {
    await navigator.geolocation.getCurrentPosition(async location => {
      const { latitude, longitude } = location.coords;
      this.retrieveEvents(latitude, longitude);
      this.setState({
        latitude,
        longitude
      });
    });
  };

  retrieveEvents = async (lat, lng) => {
<<<<<<< HEAD
=======
    // const { events } = this.state;
>>>>>>> 95db2ac37a1b74e7b2b0ae76b03fe6ade38963ae
    const events = await getEvents(lat, lng);
    await this.setState({ events });
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
