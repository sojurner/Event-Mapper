import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Feature, Layer } from 'react-mapbox-gl';

import { UserLocation } from '../../components/UserLocation/UserLocation';
import { EventPopup } from '../../components/EventPopup/EventPopup';
import { setEvents, setTargetEvent, setZoom } from '../../actions/index.js';
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
      mapType: 'streets'
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

  adjustCenter = event => {
    const { setTargetEvent, setZoom } = this.props;
    setTargetEvent(event);
    setZoom([16]);
  };

  render() {
    const {
      targetEvent,
      userLocation,
      events,
      displayPopup,
      zoom
    } = this.props;
    let latitude;
    let longitude;
    if (targetEvent) {
      latitude = targetEvent.lat;
      longitude = targetEvent.lng;
    } else {
      latitude = userLocation.latitude;
      longitude = userLocation.longitude;
    }
    const { mapType } = this.state;

    const features = events.map((eve, index) => {
      let coordinates = [eve.lng, eve.lat];
      return (
        <Feature
          key={`event-${index}`}
          coordinates={coordinates}
          onClick={this.adjustCenter.bind(null, eve)}
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
          center={[longitude, latitude]}
          zoom={zoom}
          style={`mapbox://styles/mapbox/${mapType}-v9`}
          containerStyle={{ height: '100vh', width: '100vw' }}
          flyToOptions={{ speed: 0.8 }}
        >
          {displayPopup && <EventPopup targetEvent={targetEvent} />}

          <UserLocation
            lng={userLocation.longitude}
            lat={userLocation.latitude}
          />
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
  eventLocation: state.eventLocation,
  events: state.events,
  displayPopup: state.displayPopup,
  targetEvent: state.targetEvent,
  zoom: state.zoom
});

export const mapDispatchToProps = dispatch => ({
  setEvents: events => dispatch(setEvents(events)),
  setTargetEvent: event => dispatch(setTargetEvent(event)),
  setZoom: zoomVal => dispatch(setZoom(zoomVal))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
