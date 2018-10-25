import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Map from '../../components/Map/Map';
import { loginUser } from '../../actions';
import './App.css';

import * as keys from '../../utilities/apiCalls/apiKeys';
import { postUser } from '../../utilities/apiCalls/apiCalls';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
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

  render() {
    const { user } = this.state;
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
          <div>
            <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
            <Map />
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
