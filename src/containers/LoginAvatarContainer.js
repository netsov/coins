import React from 'react'
import { connect } from 'react-redux';

import { LoggedInAvatar, LoggedOutAvatar } from '../components/Avatar';
// import {signOut} from '../utils/firebase'

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export const LoginAvatarContainer = connect(mapStateToProps)((props) => {
  return props.user ? <LoggedInAvatar {...props} /> : <LoggedOutAvatar {...props} />;
});
