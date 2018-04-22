import { connect } from 'react-redux';

import { Pie } from '../components/Pie';

import { getItems } from '../actions/positions';

const mapStateToProps = state => {
  return {
    positions: state.positions
  };
};

export const PieContainer = connect(mapStateToProps, {
  getPositions: getItems,
})(Pie);
