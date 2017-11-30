import { connect } from 'react-redux';

import Positions from '../components/Positions';
import { getPositions, deletePosition } from '../actions';

const mapStateToProps = state => {
  return {
    positions: state.positions,
  };
};

export default connect(mapStateToProps, {
  getPositions,
  deletePosition
})(Positions);
