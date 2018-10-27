import React from 'react';
import { GoogleLogout } from 'react-google-login';
import Map from '../Map/Map';
import NavBar from '../NavBar/NavBar';

export const HomeDisplay = ({
  changeMap,
  displaySidebar,
  stateSideBar,
  mapType,
  logout
}) => (
  <div className="main-container">
    <Map mapStyle={mapType} />
    <GoogleLogout
      className="logout-button"
      buttonText="Logout"
      onLogoutSuccess={logout}
    />
    <div
      className={
        mapType === 'streets' ? 'toggle-map-style' : 'toggle-map-style-active'
      }
    >
      <i
        className={
          !stateSideBar ? `fas fa-bars ${mapType}` : 'far fa-window-close'
        }
        onClick={displaySidebar}
      />
      <button
        className={`${mapType}-button`}
        onClick={event => changeMap(event, 'dark')}
      />
    </div>
    {stateSideBar && <NavBar />}
  </div>
);
