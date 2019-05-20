import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Feature, Layer } from 'react-mapbox-gl';

import { UserLocation } from '../../components/UserLocation/UserLocation';
import EventPopup from '../../components/EventPopup/EventPopup';
import * as actions from '../../actions/index.js';

import mapPin from '../../images/location-point.png';
import './Map.css';

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
      mapType: 'dark'
    };
  }

  changeMap = (event, style) => {
    event.preventDefault();
    const { mapType } = this.state;
    mapType !== style
      ? this.setState({ mapType: style })
      : this.setState({ mapType: 'streets' });
  };

  adjustCenter = event => {
    const {
      setTargetEvent,
      setZoom,
      changePopupDisplay,
      setMapCenter,
      setScrollItem
    } = this.props;
    const coordinates = { latitude: event.lat, longitude: event.lng };
    setTargetEvent(event);
    setScrollItem(event.e_id);
    changePopupDisplay(true);
    setZoom([16]);
    setMapCenter(coordinates);
  };

  removePopup = () => {
    this.props.changePopupDisplay(false);
  };

  render() {
    const {
      userLocation,
      events,
      eventPages,
      mapCenter,
      displayPopup,
      zoom
    } = this.props;
    let latitude;
    let longitude;
    if (userLocation) {
      latitude = userLocation.latitude;
      longitude = userLocation.longitude;
    } else {
      latitude = 39.7392;
      longitude = -104.9903;
    }
    const { mapType } = this.state;

    const features = events[eventPages.current].map((event, index) => {
      let coordinates = [event.lng, event.lat];
      return (
        <Feature
          key={`event-${index}`}
          coordinates={coordinates}
          onClick={this.adjustCenter.bind(null, event)}
        />
      );
    });
    return (
      <div className={'map-container'}>
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
          onDrag={this.removePopup}
          center={mapCenter.map(coord => parseFloat(coord))}
          zoom={zoom}
          style={`mapbox://styles/mapbox/${mapType}-v9`}
          containerStyle={{ height: '100vh', width: '100vw' }}
          flyToOptions={{ speed: 0.8 }}
        >
          {displayPopup && <EventPopup className="event-popup-container" />}
          <UserLocation
            lng={longitude}
            lat={latitude}
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
  events: PropTypes.object,
  setTargetEvent: PropTypes.func,
  setZoom: PropTypes.func,
  changePopupDisplay: PropTypes.func,
  userLocation: PropTypes.object,
  mapStyle: PropTypes.string,
  zoom: PropTypes.array
};

export const mapStateToProps = state => ({
  userLocation: state.userLocation,
  eventLocation: state.eventLocation,
  events: state.events,
  eventPages: state.eventPages,
  mapCenter: state.mapCenter,
  displayPopup: state.displayPopup,
  targetEvent: state.targetEvent,
  zoom: state.zoom
});

export const mapDispatchToProps = dispatch => ({
  setTargetEvent: event => dispatch(actions.setTargetEvent(event)),
  setMapCenter: coordinates => dispatch(actions.setMapCenter(coordinates)),
  setZoom: zoomVal => dispatch(actions.setZoom(zoomVal)),
  setModalView: (event, command) =>
    dispatch(actions.setModalView(event, command)),
  changePopupDisplay: bool => dispatch(actions.changePopupDisplay(bool)),
  setScrollItem: id => dispatch(actions.setScrollItem(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
