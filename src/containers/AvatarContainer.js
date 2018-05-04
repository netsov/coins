import React from 'react';
import { connect } from 'react-redux';

import { LoggedInAvatar, LoggedOutAvatar } from '../components/Avatar';
import { signIn, signOut } from '../actions';
// import {signOut} from '../utils/firebase'

const mapStateToProps = state => {
  return {
    user: state.user,
    authNotificationFlag: state.authNotificationFlag,
  };
};

export const AvatarContainer = connect(mapStateToProps, { signIn, signOut })(
  props => {
    return props.user ? (
      <LoggedInAvatar {...props} />
    ) : (
      <LoggedOutAvatar {...props} />
    );
  }
);
