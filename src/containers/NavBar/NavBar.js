import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import './NavBar.css';

export class NavBar extends Component {
  render() {
    const { activeUser, watchlist, logout, displaySidebar } = this.props;
    const { id, first_name } = activeUser;
    return (
      <nav className="nav-container">
        <h1 className="greeting">{`Hi, ${first_name} !`}</h1>
        <NavLink
          className="nav-link"
          onClick={displaySidebar}
          exact
          to={`/home/${id}`}
        >
          <i className="fas fa-home" />
          Home
        </NavLink>
        <NavLink
          className="nav-link"
          onClick={displaySidebar}
          to={`/home/${id}/profile`}
        >
          <i className="fas fa-user" />
          Profile
        </NavLink>
        <NavLink
          className="nav-link"
          onClick={displaySidebar}
          to={`/home/${id}/watchlist`}
        >
          <i className="far fa-eye" />
          Watchlist
          <span className="watchlist-number"> ({watchlist.length})</span>
        </NavLink>
        <GoogleLogout className="nav-link logout-btn" onLogoutSuccess={logout}>
          <i className="fas fa-sign-out-alt" />
          Logout
        </GoogleLogout>
      </nav>
    );
  }
}

export const mapStateToProps = state => ({
  activeUser: state.activeUser,
  watchlist: state.watchList
});

NavBar.propTypes = {
  activeUser: PropTypes.object,
  logout: PropTypes.func
};

export default connect(mapStateToProps)(NavBar);
