import { connect } from 'react-redux';

import { Pie } from '../components/Pie';

import { getPositions } from '../actions';

const mapStateToProps = (state) => {
  return {
    positions: state.positions,
    prices: state.prices,
  };
};

export const PieContainer = connect(mapStateToProps, {
  getPositions
})(Pie);
