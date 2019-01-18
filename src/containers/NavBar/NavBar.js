import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import './NavBar.css';

export class NavBar extends Component {
  state = {
    displaySidebar: false
  };

  displaySidebar = () => {
    this.setState({ displaySidebar: !this.state.displaySidebar });
  };

  render() {
    const { activeUser, watchlist, logout } = this.props;
    const { id, first_name } = activeUser;
    const { displaySidebar } = this.state;
    return (
      <div>
        <div className="quarter-circle-top-right">
          <i
            className={!displaySidebar ? `fas fa-stream` : 'fab fa-xing'}
            onClick={this.displaySidebar}
          />
        </div>
        <nav
          className={displaySidebar ? 'nav-container' : 'nav-container-hide'}
        >
          <h1 className="greeting">{`Hi, ${first_name} !`}</h1>
          <NavLink
            className="nav-link"
            onClick={this.displaySidebar}
            exact
            to={`/home/${id}`}
          >
            <i className="fas fa-home" />
            Home
          </NavLink>
          <NavLink
            className="nav-link"
            onClick={this.displaySidebar}
            to={`/home/${id}/profile`}
          >
            <i className="fas fa-user" />
            Profile
          </NavLink>
          <NavLink
            className="nav-link"
            onClick={this.displaySidebar}
            to={`/home/${id}/watchlist`}
          >
            <i className="far fa-eye" />
            Watchlist
            <span className="watchlist-number"> ({watchlist.length})</span>
          </NavLink>
          <GoogleLogout
            className="nav-link logout-btn"
            onLogoutSuccess={logout}
          >
            <i className="fas fa-sign-out-alt" />
            Logout
          </GoogleLogout>
        </nav>
      </div>
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
