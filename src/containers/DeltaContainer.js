import React from 'react';
import { connect } from 'react-redux';

import { getTimestamp } from '../utils';

const Delta = ({ delta }) => {
  const minutes = Math.ceil(delta / 60);
  const updated =
    delta > 30 ? `${minutes} minute${minutes > 1 ? 's' : ''} ago` : 'just now';
  return <em>Updated:&nbsp;{updated}</em>;
};

const mapStateToProps = state => {
  return {
    delta: state.timestamp ? getTimestamp() - state.timestamp : null,
  };
};

export const DeltaContainer = connect(mapStateToProps)(Delta);
