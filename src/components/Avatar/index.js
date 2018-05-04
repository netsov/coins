import React from 'react';
import Avatar from 'antd/lib/avatar';
import Popover from 'antd/lib/popover';
import Button from 'antd/lib/button';
import Badge from 'antd/lib/badge';
import { Login } from '../Login';
import './index.css';

// import { LoginNotificationText } from '../Login';

// const LoggedOutContent = () => <p>test</p>;

export const LoggedOutAvatar = ({ authNotificationFlag, signIn }) => {
  if (!authNotificationFlag) return null;
  return (
    <Popover
      content={<Login  signIn={signIn}/>}
      trigger="click"
      // title={<LoginNotificationText maxWidth={300} />}
    >
      <div className="auth-avatar">
        <Badge dot>
          <Avatar icon="user" />
        </Badge>
      </div>
    </Popover>
  );
};

const LoggedInContent = ({signOut}) => {
  return <Button onClick={signOut}>Logout</Button>;
};

export const LoggedInAvatar = ({ user, signOut }) => {
  return (
    <Popover
      content={<LoggedInContent signOut={signOut}/>}
      trigger="click"
      title={user.displayName || user.email}
    >
      <div className="auth-avatar">
        <Badge>
          <Avatar src={user.photoURL} />
        </Badge>
      </div>
    </Popover>
  );
};
