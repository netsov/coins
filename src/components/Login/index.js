import React from 'react';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';

import './index.css';

export const Login = () => {
  return (
    <div className="login-container">
      <Button type="primary" icon="google">
        Login with Google
      </Button>
      <Button type="primary" icon="twitter">
        Login with Twitter
      </Button>
    </div>
  );
};

export const LoginWarningText = ({ maxWidth }) => (
  <p style={{ maxWidth }}>
    All your data is stored in the browser and no one except you has excess to
    it. <br />
    If you would like to use this app on multiple devices/browsers you can log
    in using one of the options below and keep it in sync.
  </p>
);

export const LoginWarning = () => {
  return (
    <div className="login-warning">
      <Alert
        message={
          <div>
            <LoginWarningText />
            <Login />
          </div>
        }
        type="info"
        // closeText="Dismiss"
        onClose={() => {}}
        closable
        banner
      />
    </div>
  );
};
