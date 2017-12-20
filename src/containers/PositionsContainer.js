import { connect } from 'react-redux';

import {Positions} from '../components/Positions';
import { getPositions, updatePosition, toggleSelected, toggleSelectAll, openEditor, getSettings, getPrices } from '../actions';

const mapStateToProps = state => {
  return {
    positions: state.positions,
    prices: state.prices,
    selected: state.selected,
    showCharts: state.settings.showCharts,
  };
};

export const PositionsContainer = connect(mapStateToProps, {
  getPositions,
  updatePosition,
  toggleSelected,
  toggleSelectAll,
  openEditor,
  getSettings,
  getPrices,
})(Positions);