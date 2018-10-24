import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import * as keys from '../../utilities/apiCalls/apiKeys';
import Map from '../Map/Map';
export class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  responseGoogle = res => {
    //googleid, familyname, givenName, email
    this.setState({ user: res });
  };

  logout = res => {
    console.log(res);
    this.setState({ user: null });
  };

  render() {
    return (
      <div className="App">
        <GoogleLogin
          clientId={keys.googleClientId}
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
        <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
        <Map />
        <header className="App-header">
          <h1>Hello World</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
