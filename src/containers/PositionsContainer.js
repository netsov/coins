import { connect } from 'react-redux';

import { Positions } from '../components/Positions';
import {
  toggleSelected,
  toggleSelectAll,
  openEditor,
  getTickerData,
} from '../actions';
import { getItems, updateItem, deleteItems } from '../actions/positions';

import { getTimestamp } from '../utils';

export function calcTotal(positions, key) {
  return positions.reduce(
    (acc, next) => acc + next.quantity * parseFloat(next.__meta[key]),
    0
  );
}

const mapStateToProps = state => {
  return {
    positions: state.positions,
    selected: state.selected,
    delta: state.timestamp ? getTimestamp() - state.timestamp : null,
    totalUSD: calcTotal(state.positions, 'price_usd').toFixed(0),
    totalBTC: calcTotal(state.positions, 'price_btc').toFixed(6),
  };
};

export const PositionsContainer = connect(mapStateToProps, {
  getPositions: getItems,
  updatePosition: updateItem,
  toggleSelected,
  toggleSelectAll,
  openEditor,
  getTickerData,
  deletePositions: deleteItems,
})(Positions);
