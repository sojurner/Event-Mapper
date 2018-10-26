import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
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
      mapType: 'streets',
      redirect: false
    };
  }

  login = async res => {
    const activeUser = await postUser(res.profileObj);
    this.props.loginUser(activeUser);
    this.setState({ user: res, redirect: true });
  };

  logout = res => {
    this.setState({ user: null, redirect: false });
  };

  changeMap = (event, style) => {
    event.preventDefault();
    const { mapType } = this.state;
    mapType !== style
      ? this.setState({ mapType: style })
      : this.setState({ mapType: 'streets' });
  };

  render() {
    const { mapType, redirect } = this.state;
    const loginDisplay = () => (
      <div className='placement-container'>
        <div className='login-container'>
          <h1>EVENT MAPPER</h1>
          <GoogleLogin
            clientId={keys.googleClientId}
            className = "login-button"
            buttonText="Login with Google"
            onSuccess={this.login}
            onFailure={this.login}
          />
        </div>
      </div>
    );
    const homeDisplay = () => (
      <div className="main-container">
        <Map mapStyle={this.state.mapType} />
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
        <NavBar />
      </div>
    );
        
    return (
      <div className="App">
        {redirect === true && (<Redirect to={'/app'} />)}
        {redirect === false && (<Redirect to={'/'} />)}
        <Route exact path={'/'} component={loginDisplay}></Route>
        <Route path={'/app'} component={homeDisplay}></Route>
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

export default withRouter(connect(null, mapDispatchToProps)(App));
