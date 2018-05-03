import React from 'react';
import Avatar from 'antd/lib/avatar';
import Popover from 'antd/lib/popover';
import Button from 'antd/lib/button';
import Badge from 'antd/lib/badge';
import { Login } from '../Login';
import './index.css';
import { signOut } from '../../utils/firebase';

// import { LoginWarningText } from '../Login';

// const LoggedOutContent = () => <p>test</p>;

export const LoggedOutAvatar = ({ authWarningFlag }) => {
  if (!authWarningFlag) return null;
  return (
    <Popover
      content={<Login />}
      trigger="click"
      // title={<LoginWarningText maxWidth={300} />}
    >
      <div className="auth-avatar">
        <Badge dot>
          <Avatar icon="user" />
        </Badge>
      </div>
    </Popover>
  );
};

const LoggedInContent = () => {
  return <Button onClick={signOut}>Logout</Button>;
};

export const LoggedInAvatar = ({ user }) => {
  return (
    <Popover content={<LoggedInContent />} trigger="click" title={user.email}>
      <div className="auth-avatar">
        <Badge>
          <Avatar src={user.photoURL} />
        </Badge>
      </div>
    </Popover>
  );
};
