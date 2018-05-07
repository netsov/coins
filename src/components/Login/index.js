import React from 'react';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';

import './index.css';

export const Login = ({ signIn }) => {
  return (
    <div className="login-container">
      <Button type="primary" icon="google" onClick={() => signIn('google')}>
        Login with Google
      </Button>
      <Button type="primary" icon="twitter" onClick={() => signIn('twitter')}>
        Login with Twitter
      </Button>
      <Button type="primary" icon="github" onClick={() => signIn('github')}>
        Login with Github
      </Button>
    </div>
  );
};

export const AuthNotificationText = ({ maxWidth }) => (
  <p style={{ maxWidth }}>
    All your data is stored in the browser and only you have access to it.
    <br />
    If you would like to use this app on multiple devices/browsers you can log
    in using one of the options below and keep it in sync.
  </p>
);

export const AuthNotification = ({
  user,
  authNotificationFlag,
  dismissAuthNotification,
  signIn,
}) => {
  if (user || authNotificationFlag) return null;
  return (
    <div className="auth-notification">
      <Alert
        message={
          <div>
            <AuthNotificationText />
            <Login signIn={signIn} />
          </div>
        }
        type="info"
        // closeText="Dismiss"
        onClose={dismissAuthNotification}
        closable
        banner
      />
    </div>
  );
};
