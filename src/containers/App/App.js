import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Map from '../../components/Map/Map';
import { loginUser } from '../../actions';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

import * as keys from '../../utilities/apiCalls/apiKeys';
import { postUser } from '../../utilities/apiCalls/apiCalls';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      mapType: 'streets'
    };
  }

  responseGoogle = async res => {
    const activeUser = await postUser(res.profileObj);
    this.props.loginUser(activeUser);
    this.setState({ user: res });
  };

  logout = res => {
    this.setState({ user: null });
  };

  changeMap = (event, style) => {
    event.preventDefault();
    const { mapType } = this.state;
    mapType !== style
      ? this.setState({ mapType: style })
      : this.setState({ mapType: 'streets' });
  };

  render() {
    const { user, mapType } = this.state;
    return (
      <div className="App">
        {!user && (
          <GoogleLogin
            clientId={keys.googleClientId}
            buttonText="Login w/ Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        )}
        {user && (
          <div className="main-container">
            <GoogleLogout
              className="logout-button"
              buttonText="Logout"
              onLogoutSuccess={this.logout}
            />
            <div
              className={
                mapType === 'streets'
                  ? 'toggle-map-style'
                  : 'toggle-map-style-active'
              }
            >
              <button
                className={`${mapType}-button`}
                onClick={event => this.changeMap(event, 'dark')}
              />
            </div>
            <Map mapStyle={this.state.mapType} />
            <NavBar />
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  loginUser: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user))
});

export default connect(null, mapDispatchToProps)(App);
