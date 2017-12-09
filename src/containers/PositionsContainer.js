import { connect } from 'react-redux';

import {Positions} from '../components/Positions';
import { getPositions, updatePosition, toggleSelected, openEditor } from '../actions';

const mapStateToProps = state => {
  return {
    positions: state.positions,
    selected: state.selected,
  };
};

export const PositionsContainer = connect(mapStateToProps, {
  getPositions,
  updatePosition,
  toggleSelected,
  openEditor
})(Positions);