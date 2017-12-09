import { connect } from 'react-redux';

import {Positions} from '../components/Positions';
import { getPositions, updatePosition, toggleSelected, toggleSelectAll, openEditor } from '../actions';

const mapStateToProps = state => {
  return {
    positions: state.positions,
    selected: state.selected,
    showCharts: state.settings.showCharts,
  };
};

export const PositionsContainer = connect(mapStateToProps, {
  getPositions,
  updatePosition,
  toggleSelected,
  toggleSelectAll,
  openEditor
})(Positions);