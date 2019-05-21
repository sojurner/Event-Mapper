import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { loginUser, setUserLocation, setMapCenter } from '../../actions';
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
      redirect: false,
      error: null
    };
  }

  componentDidMount() {
    this.setLatLngEvents();
  }

  setLatLngEvents = async () => {
    const { setMapCenter, setUserLocation } = this.props;
    if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation(position.coords);
          setMapCenter(position.coords);
        },
        error => {
          const coords = { latitude: 39.7392, longitude: -104.9903 };
          setUserLocation(coords);
          setMapCenter(coords);
        },
        options
      );
    }
  };

  loginSuccess = async res => {
    const { loginUser, activeUser } = this.props;
    if (!activeUser) {
      await this.setState({ loading: true });
    }
    const user = await postUser(res.profileObj);
    loginUser(user);
    this.setState({ redirect: true, loading: false });
  };

  loginFail = async res => {
    const error = await postUser(res.profileObj);
    this.setState({ error });
  };

  logout = () => {
    this.setState({ user: null, redirect: false });
  };

  render() {
    const { redirect, loading, error } = this.state;
    const { activeUser } = this.props;
    if (error) {
      return <div>{error.error}</div>;
    }
    return (
      <Router>
        <div>
          {loading && <LoadingScreen />}
          {activeUser && <NavBar logout={this.logout} />}
          <Routes
            redirect={redirect}
            user={activeUser}
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
  setUserLocation: PropTypes.func,
  activeUser: PropTypes.object
};

export const mapStateToProps = state => ({
  activeUser: state.activeUser
});

export const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
  setUserLocation: coordinates => dispatch(setUserLocation(coordinates)),
  setMapCenter: coordinates => dispatch(setMapCenter(coordinates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
