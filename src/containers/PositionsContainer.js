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
  deletePositions,
} from '../actions';

import { calcTotalSum } from '../utils';

const mapStateToProps = state => {
  return {
    positions: state.positions,
    prices: state.prices,
    selected: state.selected,
    totalUSD: calcTotalSum(state.positions, state.prices, 'USD', 2),
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
  deletePositions,
})(Positions);
