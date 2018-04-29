import { connect } from 'react-redux';

import { Positions } from '../components/Positions';
import {
  getPositions,
  updatePosition,
  deletePositions,
  toggleSelectAlldPositions,
  toggleSelectedPositions,
  openPositionEditor,
} from '../actions/positions';

import { getTimestamp } from '../utils';

export function calcTotal(positions, key) {
  return positions.reduce(
    (acc, next) => acc + next.quantity * parseFloat(next.__meta[key]),
    0
  );
}

const mapStateToProps = state => {
  return {
    editorIsOpened: !!state.positions.formItem,
    positions: state.positions.items,
    selected: state.positions.selected,
    delta: state.timestamp ? getTimestamp() - state.timestamp : null,
    totalUSD: calcTotal(state.positions.items, 'price_usd').toFixed(0),
    totalBTC: calcTotal(state.positions.items, 'price_btc').toFixed(6),
  };
};

export default connect(mapStateToProps, {
  getPositions,
  updatePosition,
  deletePositions,
  toggleSelected: toggleSelectedPositions,
  toggleSelectAll: toggleSelectAlldPositions,
  openEditor: openPositionEditor,
})(Positions);
