import { connect } from 'react-redux';

import { LoginWarning } from '../components/Login';

import {getAuthWarningFlag} from '../utils/localStorage'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    authWarningFlag: getAuthWarningFlag()
  };
};


export const LoginWarningContainer = connect(mapStateToProps)(LoginWarning);
