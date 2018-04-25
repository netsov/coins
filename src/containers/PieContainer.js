import { connect } from 'react-redux';

import { Pie } from '../components/Pie';

import { getPositions } from '../actions/positions';

const mapStateToProps = state => {
  return {
    positions: state.positions,
  };
};

const PieContainer = connect(mapStateToProps, {
  getPositions: getPositions,
})(Pie);

export default PieContainer;
