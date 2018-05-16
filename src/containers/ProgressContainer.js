import React from 'react';
import { connect } from 'react-redux';

import { Progress } from '../components/Progress';

const mapStateToProps = state => {
  return {
    show:
      state.auth.fetching ||
      state.positions.fetching ||
      state.positions.updating ||
      state.positions.deleting ||
      state.watchlist.fetching ||
      state.watchlist.updating ||
      state.watchlist.deleting,
  };
};

export default connect(mapStateToProps)(
  ({ show }) => (show ? <Progress /> : null)
);
