import { connect } from 'react-redux';

import { Pie } from '../components/Pie';

// import { getPositions } from '../actions/positions';

const mapStateToProps = state => {
  return {
    positions: state.positions.items,
    tickerById: state.tickerById,
  };
};

const PieContainer = connect(mapStateToProps)(Pie);

export default PieContainer;
