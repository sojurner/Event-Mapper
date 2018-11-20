import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Feature, Layer } from 'react-mapbox-gl';

import { UserLocation } from '../../components/UserLocation/UserLocation';
import { EventPopup } from '../../components/EventPopup/EventPopup';
import { setEvents } from '../../actions/index.js';
import { getEvents } from '../../utilities/apiCalls/apiCalls';

import mapPin from '../../images/location-point.png';

const ReactMap = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MB_ACCESS_TOKEN
});

const layout = { 'icon-image': 'point' };
const image = new Image();
image.src = mapPin;
image.useMap = 'marker';
image.isMap = true;
image.crossOrigin = 'anonymous';
image.height = 30;
image.width = 30;

const images = ['point', image];

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: props.userLocation.latitude,
      longitude: props.userLocation.longitude,
      mapType: 'streets',
      center: null,
      zoom: [10]
    };
  }

  componentDidMount() {
    const { latitude, longitude } = this.props.userLocation;
    this.retrieveEvents(latitude, longitude);
  }

  retrieveEvents = async (lat, lng) => {
    if (!lat && !lng) return;
    const events = await getEvents(lat, lng);
    this.props.setEvents(events);
  };

  changeMap = (event, style) => {
    event.preventDefault();
    const { mapType } = this.state;
    mapType !== style
      ? this.setState({ mapType: style })
      : this.setState({ mapType: 'streets' });
  };

  adjustCenter = center => {
    this.setState({ center, zoom: [14] });
  };

  render() {
    let latitude = this.state.latitude || this.props.userLocation.latitude;
    let longitude = this.state.longitude || this.props.userLocation.longitude;
    const { mapType, zoom, center } = this.state;
    const { events, displayPopup, targetEvent } = this.props;

    const features = events.map((eve, index) => {
      let coordinates = [eve.lng, eve.lat];
      return (
        <Feature
          key={`event-${index}`}
          coordinates={coordinates}
          onClick={this.adjustCenter.bind(null, coordinates)}
        />
      );
    });

    return (
      <div>
        <div
          className={
            mapType === 'streets'
              ? 'toggle-map-style'
              : 'toggle-map-style-active'
          }
        >
          <button
            className={`${mapType}-button`}
            onClick={event => this.changeMap(event, 'dark')}
          />
        </div>
        <ReactMap
          center={center || [longitude, latitude]}
          zoom={zoom}
          style={`mapbox://styles/mapbox/${mapType}-v9`}
          containerStyle={{ height: '100vh', width: '100vw' }}
          flyToOptions={{ speed: 0.8 }}
        >
          {displayPopup && <EventPopup targetEvent={targetEvent} />}

          <UserLocation lng={longitude} lat={latitude} />
          <Layer type="symbol" id="marker" layout={layout} images={images}>
            {features}
          </Layer>
        </ReactMap>
      </div>
    );
  }
}

Map.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  events: PropTypes.array,
  setEvents: PropTypes.func,
  userLocation: PropTypes.object,
  mapStyle: PropTypes.string
};

export const mapStateToProps = state => ({
  userLocation: state.userLocation,
  eventLocation: state.eventLocation
});

export const mapDispatchToProps = dispatch => ({
  setEvents: events => dispatch(setEvents(events))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
