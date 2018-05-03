import React from 'react'
import { connect } from 'react-redux';

import { LoggedInAvatar, LoggedOutAvatar } from '../components/Avatar';
import {getAuthWarningFlag} from "../utils/localStorage";
// import {signOut} from '../utils/firebase'

const mapStateToProps = state => {
  return {
    user: state.user,
    authWarningFlag: getAuthWarningFlag()
  };
};

export const LoginAvatarContainer = connect(mapStateToProps)((props) => {
  return props.user ? <LoggedInAvatar {...props} /> : <LoggedOutAvatar {...props} />;
});
