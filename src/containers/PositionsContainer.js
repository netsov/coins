import { connect } from 'react-redux';

import { Positions } from '../components/Positions';
import {
  getPositions,
  updatePosition,
  toggleSelected,
  toggleSelectAll,
  openEditor,
  getSettings,
  // getPrices,
  deletePositions,
  getTickerData,
} from '../actions';

// import { calcTotalSum } from '../utils';

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
  const tickerById = state.ticker.reduce(
    (acc, next) => ({ ...acc, [next.id]: next }),
    {}
  );
  return {
    positions: state.positions.map(p => ({
      ...p,
      __meta: tickerById[p.__id] || {},
    })),
    selected: state.selected,
    totalUSD: calcTotal(state.positions, tickerById, 'price_usd').toFixed(2),
    totalBTC: calcTotal(state.positions, tickerById, 'price_btc').toFixed(6),
  };
};

export const PositionsContainer = connect(mapStateToProps, {
  getPositions,
  updatePosition,
  toggleSelected,
  toggleSelectAll,
  openEditor,
  getSettings,
  getTickerData,
  deletePositions,
})(Positions);
