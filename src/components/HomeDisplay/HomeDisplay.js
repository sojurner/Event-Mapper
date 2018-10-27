import React from 'react';
import { GoogleLogout } from 'react-google-login';
import Map from '../Map/Map';
import NavBar from '../NavBar/NavBar';

export const HomeDisplay = ({
  changeMap,
  displaySidebar,
  stateSidebar,
  mapType,
  logout,
  user
}) => (
  <div className="main-container">
    <Map mapStyle={mapType} />
    <GoogleLogout
      className="logout-button"
      buttonText="Logout"
      onLogoutSuccess={logout}
    />
  </div>
);
