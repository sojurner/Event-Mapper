import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Popup } from 'react-mapbox-gl';
import './EventPopup.css';
import { setModalView } from '../../actions';

const EventPopup = ({ targetEvent, setModalView }) => {
  let { name, img, lat, lng } = targetEvent;
  const coords = [lng, lat];
  if (name.length > 38) {
    name = name.slice(0, 36).concat('...');
  }

  return (
    <Popup
      coordinates={coords}
      offset={{
        'bottom-left': [12, -38],
        bottom: [0, -38],
        'bottom-right': [-12, -38]
      }}
      className="popup-container"
    >
      <i onClick={event => setModalView(event, true)} className="far fa-eye" />
      <h1 className="popup-name">{name}</h1>
      <img
        src={`${img}`}
        alt="container displaying event info"
        className="popup-img"
      />
    </Popup>
  );
};

const mapStateToProps = state => ({
  targetEvent: state.targetEvent
});

const mapDispatchtoProps = dispatch => ({
  setModalView: (event, command) => dispatch(setModalView(event, command))
});

EventPopup.propTypes = {
  targetEvent: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(EventPopup);
