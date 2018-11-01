import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { loginUser, setUserLocation } from '../../actions';
import { Routes } from '../../components/Routes/Routes';
import NavBar from '../NavBar/NavBar';

import { postUser } from '../../utilities/apiCalls/apiCalls';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displaySidebar: false,
      redirect: false
    };
  }

  componentDidMount() {
    this.setLatLngEvents();
  }

  setLatLngEvents = async () => {
    await navigator.geolocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords;
      this.props.setUserLocation({ latitude, longitude });
    });
  };

  login = async res => {
    const activeUser = await postUser(res.profileObj);
    this.props.loginUser(activeUser);
    this.setState({ user: activeUser, redirect: true });
  };

  logout = () => {
    this.setState({ user: null, redirect: false, displaySidebar: false });
  };

  displaySidebar = () => {
    this.setState({ displaySidebar: !this.state.displaySidebar });
  };

  render() {
    const { redirect, displaySidebar, user } = this.state;
    return (
      <Router>
        <div>
          {user && (
            <div>
              <div
                className={
                  !displaySidebar
                    ? `quarter-circle-top-right`
                    : 'quarter-circle-top-right-inactive'
                }
              />
              <i
                className={
                  !displaySidebar ? `fas fa-bars` : 'far fa-window-close'
                }
                onClick={this.displaySidebar}
              />
            </div>
          )}
          {displaySidebar && <NavBar logout={this.logout} />}
          <Routes
            redirect={redirect}
            changeMap={this.changeMap}
            displaySidebar={this.displaySidebar}
            stateSidebar={displaySidebar}
            user={user}
            login={this.login}
          />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  loginUser: PropTypes.func,
  setUserLocation: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
  setUserLocation: coordinates => dispatch(setUserLocation(coordinates))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
