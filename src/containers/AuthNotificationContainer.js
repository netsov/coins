import { connect } from 'react-redux';
import {dismissAuthNotification} from '../actions'
import {signIn, signOut} from '../actions'

import { AuthNotification } from '../components/Login';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    authNotificationFlag: state.authNotificationFlag
  };
};


export const AuthNotificationContainer = connect(mapStateToProps, {dismissAuthNotification, signIn, signOut})(AuthNotification);
