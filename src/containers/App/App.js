import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { loginUser, setUserLocation } from '../../actions';
import { Routes } from '../../components/Routes/Routes';
import NavBar from '../NavBar/NavBar';
import { LoadingScreen } from '../../components/LoadingScreen/LoadingScreen';

import { postUser } from '../../utilities/apiCalls/apiCalls';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: false,
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

  loginSuccess = async res => {
    if (!this.state.user) {
      await this.setState({ loading: true });
    }
    const activeUser = await postUser(res.profileObj);
    this.props.loginUser(activeUser);
    this.setState({ user: activeUser, redirect: true, loading: false });
  };

  loginFail = async res => {
    const error = await postUser(res.profileObj);
    this.setState({ error });
  };

  logout = () => {
    this.setState({ user: null, redirect: false, displaySidebar: false });
  };

  displaySidebar = () => {
    this.setState({ displaySidebar: !this.state.displaySidebar });
  };

  render() {
    const { redirect, displaySidebar, user, loading } = this.state;
    return (
      <Router>
        <div>
          {loading && <LoadingScreen />}
          {user && (
            <div>
              <div className={`quarter-circle-top-right`} />
              <i
                className={
                  !displaySidebar ? `fas fa-bars` : 'fas fa-times-circle'
                }
                onClick={this.displaySidebar}
              />
            </div>
          )}
          {displaySidebar && (
            <NavBar displaySidebar={this.displaySidebar} logout={this.logout} />
          )}
          <Routes
            redirect={redirect}
            changeMap={this.changeMap}
            displaySidebar={this.displaySidebar}
            stateSidebar={displaySidebar}
            user={user}
            loginSuccess={this.loginSuccess}
            loginFail={this.loginFail}
          />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  displaySidebar: PropTypes.bool,
  redirect: PropTypes.bool,
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
