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

export function calcTotal(positions, tickerById, key) {
  return positions
    .filter(p => tickerById[p.__id])
    .reduce(
      (acc, next) =>
        acc + next.quantity * parseFloat(tickerById[next.__id][key]),
      0
    );
}

const mapStateToProps = state => {
  return {
    positions: state.positions.map(p => ({
      ...p,
      __meta: state.tickerById[p.__id] || {},
    })),
    selected: state.selected,
    delta: state.timestamp ? getTimestamp() - state.timestamp : null,
    totalUSD: calcTotal(state.positions, state.tickerById, 'price_usd').toFixed(
      0
    ),
    totalBTC: calcTotal(state.positions, state.tickerById, 'price_btc').toFixed(
      6
    ),
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
