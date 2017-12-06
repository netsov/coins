import { connect } from 'react-redux';

import {Positions} from '../components/Positions';
import { getPositions, savePosition, toggleSelected, openEditor } from '../actions';

const mapStateToProps = state => {
  return {
    positions: state.positions,
    selected: state.selected,
  };
};

export const PositionsContainer = connect(mapStateToProps, {
  getPositions,
  savePosition,
  toggleSelected,
  openEditor
})(Positions);