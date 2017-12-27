import { connect } from 'react-redux';

import { Positions } from '../components/Positions';
import {
  getPositions,
  updatePosition,
  toggleSelected,
  toggleSelectAll,
  openEditor,
  getSettings,
  getPrices,
} from '../actions';

import { calcTotalSum } from '../utils';

const mapStateToProps = state => {
  return {
    positions: state.positions,
    prices: state.prices,
    selected: state.selected,
    showCharts: state.settings.showCharts,
    totalUSD: calcTotalSum(state.positions, state.prices, 'USD'),
    totalBTC: calcTotalSum(state.positions, state.prices, 'BTC'),
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
