import React from 'react';
import AvatarBase from 'antd/lib/avatar';
import Popover from 'antd/lib/popover';
import Button from 'antd/lib/button';
import Badge from 'antd/lib/badge';
import { Login } from '../Login';
import './index.css';

// import { LoginWarningText } from '../Login';

// const LoggedOutContent = () => <p>test</p>;

export const LoggedOutAvatar = () => (
  <Popover
    content={<Login />}
    trigger="click"
    // title={<LoginWarningText maxWidth={300} />}
  >
    <div className="auth-avatar">
      <Badge dot>
        <AvatarBase icon="user" />
      </Badge>
    </div>
  </Popover>
);

const LoggedInContent = ({ onLogOut }) => {
  return <Button onClick={onLogOut}>Logout</Button>;
};

export const LoggedInAvatar = ({ email, onLogOut }) => (
  <Popover content={<LoggedInContent />} trigger="click" title={email}>
    <div className="auth-avatar">
      <Badge dot>
        <AvatarBase icon="user" />
      </Badge>
    </div>
  </Popover>
);
