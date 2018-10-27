import React from 'react';
import * as keys from '../../utilities/apiCalls/apiKeys';
import { GoogleLogin } from 'react-google-login';

export const LoginDisplay = ({ login }) => (
  <div className="placement-container">
    <div className="login-container">
      <h1>EVENT MAPPER</h1>
      <GoogleLogin
        clientId={keys.googleClientId}
        className="login-button"
        buttonText="Login with Google"
        onSuccess={login}
        onFailure={login}
      />
    </div>
  </div>
);
