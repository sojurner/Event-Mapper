import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavBar.css';

export class NavBar extends Component {
  render() {
    const { gid, first_name } = this.props.activeUser;
    const loggedIn = () => {
      return (
        <div className='nav-container'>
          <h1>{`Hello, ${first_name}`}</h1>
          <div className='button-container'>
            <Link to={`/${gid}/profile`}>
              <button className='main-button'>Your Profile</button>
            </Link>
            <Link to={`/${gid}/favorites`}>
              <button className='main-button'>Favorites</button>
            </Link>
          </div>
        </div>
      );
    };

    const favorites = () => {
      return (
        <div className='nav-container'>
          <div className='button-container'>
            <Link to={`/${gid}/profile`}>
              <button className='main-button'>Your Profile</button>
            </Link>
            <Link to={`/${gid}`}>
              <button className='main-button'>Current Events</button>
            </Link>
          </div>
        </div>
      );
    };

    const profile = () => {
      return (
        <div className='nav-container'>
          <Link to={`/${gid}/favorites`}>
            <button className='main-button'>Favorites</button>
          </Link>
          <Link to={`/${gid}`}>
            <button className='main-button'>Current Events</button>
          </Link>
        </div>
      );
    };

    return (
      <div className='main-nav'>
        <Route exact path={`/`} component={loggedIn}></Route>
        <Route exact path={`/${gid}/favorites`} component={favorites}></Route>
        <Route exact path={`/${gid}/profile`} component={profile}></Route>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  activeUser: state.activeUser
});

NavBar.propTypes = {
  activeUser: PropTypes.object
};

export default connect(mapStateToProps)(NavBar);
