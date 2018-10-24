import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl from 'react-mapbox-gl';
import { Event } from '../Event/Event';

import { getEvents } from '../../utilities/apiCalls/apiCalls';
import { mbAccessToken as TOKEN } from '../../utilities/apiCalls/apiKeys';

export class Map extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      events: []
    };
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  componentDidMount() {
    this.setLatLng();
    this.setEvents();
  }

  setEvents = async () => {
    const events = await getEvents();
    await this.setState({ events });
  };

  setLatLng = async () => {
    await navigator.geolocation.getCurrentPosition(async location => {
      const { latitude, longitude } = location.coords;
      await this.setState({
        latitude: latitude,
        longitude: longitude
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
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      >
        <Event events={events} />
      </Map>
    );
  }
}

const mapDispatchToProps = () => ({});

export default connect(
  null,
  mapDispatchToProps
)(Map);
