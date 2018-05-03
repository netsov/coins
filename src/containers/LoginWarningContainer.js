import { connect } from 'react-redux';

import { LoginWarning } from '../components/Login';

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};


export const LoginWarningContainer = connect(mapStateToProps)(LoginWarning);
