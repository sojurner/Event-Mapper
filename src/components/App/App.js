import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { getEvents } from '../../utilities/apiCalls/apiCalls';

import * as keys from '../../utilities/apiCalls/apiKeys';
import Map from '../Map/Map';
export class App extends Component {
  constructor() {
    super();
    this.state = {
      events: {}
    };
  }

  async componentDidMount() {
    const events = await getEvents();
    this.setState({events});
    console.log(events);
  }

  responseGoogle = res => {
    //googleid, familyname, givenName, email
    console.log(res);
  };

  logout = res => {
    console.log(res);
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
