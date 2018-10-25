import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      events: [],
      targetEvent: {},
      pageCount: 1
    };
  }

  componentDidUpdate() {
    console.log(this.state.events);
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
    const { events } = this.state;
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

const mapDispatchToProps = () => ({});

export default connect(
  null,
  mapDispatchToProps
)(Map);
