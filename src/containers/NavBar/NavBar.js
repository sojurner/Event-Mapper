import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import './NavBar.css';

export class NavBar extends Component {
  render() {
    const { activeUser, watchlist, logout } = this.props;
    const { id, first_name } = activeUser;
    return (
      <nav className="nav-container">
        <h1 className="greeting">{`Hello, ${first_name}`}</h1>
        <NavLink className="nav-link" exact to={`/home/${id}`}>
          Home
        </NavLink>
        <NavLink className="nav-link" to={`/home/${id}/profile`}>
          Profile
        </NavLink>
        <NavLink className="nav-link" to={`/home/${id}/watchlist`}>
          Watchlist{' '}
          <span className="watchlist-number">({watchlist.length})</span>
        </NavLink>
        <GoogleLogout
          className="nav-link"
          buttonText="Logout"
          onLogoutSuccess={logout}
        />
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
