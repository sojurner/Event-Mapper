import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { getEvents } from '../../utilities/apiCalls/apiCalls';

export class App extends Component {
  constructor() {
    super()
    this.state = {
      events: {}
    }
  }

  async componentDidMount() {
    const events = await getEvents();
    this.setState({events})
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
          clientId="241779944002-qa42v6cvk3kpu8da0jimdr364vn41t1r.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
        <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
        <header className="App-header">
          <h1>Hello World</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect( mapStateToProps, mapDispatchToProps )(App);
