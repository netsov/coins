import { connect } from 'react-redux';

import {Positions} from '../components/Positions';
import { getPositions, deletePosition, savePosition } from '../actions';

const mapStateToProps = state => {
  return {
    positions: state.positions,
  };
};

export const PositionsContainer = connect(mapStateToProps, {
  getPositions,
  deletePosition,
  savePosition
})(Positions);