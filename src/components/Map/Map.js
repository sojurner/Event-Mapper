import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import { mbAccessToken as TOKEN } from '../../utilities/apiCalls/apiKeys';
import { getEvents } from '../../utilities/apiCalls/apiCalls';

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

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(async location => {
      await this.renderMap(location);
    });
  }

  renderMap = location => {
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  };

  render() {
    const Map = ReactMapboxGl({
      accessToken: Token
    });
    const { latitude, longitude } = this.state;
    return (
      <Map
        center={[longitude, latitude]}
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[0, 0]} />
        </Layer>
      </Map>
    );
  }
}

export default Map;
