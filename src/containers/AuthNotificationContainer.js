import { connect } from 'react-redux';
import {dismissAuthNotification} from '../actions'
import {signIn, signOut} from '../actions'

import { AuthNotification } from '../components/Login';

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    authNotificationFlag: state.auth.authNotificationFlag
  };
};


export const AuthNotificationContainer = connect(mapStateToProps, {dismissAuthNotification, signIn, signOut})(AuthNotification);
