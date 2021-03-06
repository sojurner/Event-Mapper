import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import './LoginDisplay.css';

export const LoginDisplay = ({ loginFail, loginSuccess }) => (
  <div className="placement-container">
    <div className="login-container">
      <fieldset>
        <legend className="login-title">EVENT MAPPER</legend>

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          className="login-button"
          buttonText="Login w/ Google"
          onSuccess={loginSuccess}
          onFailure={loginFail}
        />
      </fieldset>
    </div>
  </div>
);

LoginDisplay.propTypes = {
  login: PropTypes.func
};
