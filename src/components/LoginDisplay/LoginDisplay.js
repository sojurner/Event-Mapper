import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import './LoginDisplay.css';

export const LoginDisplay = ({ login }) => (
  <div className="placement-container">
    <div className="login-container">
      <h1>EVENT MAPPER</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        className="login-button"
        buttonText="Login with Google"
        onSuccess={login}
        onFailure={login}
      />
    </div>
  </div>
);

LoginDisplay.propTypes = {
  login: PropTypes.func
};
