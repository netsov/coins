import { connect } from 'react-redux';

import { Positions } from '../components/Positions';
import {
  // getPositions,
  updatePosition,
  deletePositions,
  toggleSelectAlldPositions,
  toggleSelectedPositions,
  openPositionEditor,
} from '../actions/positions';

function calcTotal(tickerById, positions, key) {
  return positions.reduce(
    (acc, next) =>
      acc + tickerById[next.__id]
        ? next.quantity * parseFloat(tickerById[next.__id][key])
        : 0,
    0
  );
}

const mapStateToProps = state => {
  return {
    editorIsOpened: !!state.positions.formItem,
    positions: state.positions.items,
    tickerById: state.tickerById,
    selected: state.positions.selected,
    totalUSD: calcTotal(
      state.tickerById,
      state.positions.items,
      'price_usd'
    ).toFixed(0),
    totalBTC: calcTotal(
      state.tickerById,
      state.positions.items,
      'price_btc'
    ).toFixed(6),
  };
};

export default connect(mapStateToProps, {
  // getPositions,
  updatePosition,
  deletePositions,
  toggleSelected: toggleSelectedPositions,
  toggleSelectAll: toggleSelectAlldPositions,
  openEditor: openPositionEditor,
})(Positions);
