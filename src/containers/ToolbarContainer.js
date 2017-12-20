import { connect } from 'react-redux';

import { Toolbar } from '../components/Toolbar';
import { deletePosition, clearSelected, openEditor } from '../actions';
import { calcTotal, getCoinPrice, formatFloat } from '../utils';
import { openSettings } from '../actions';

function calcTotalSum(positions, prices, tsym) {
  const sum = positions.reduce(
    (acc, next) =>
      acc + calcTotal(next.quantity, getCoinPrice(next.symbol, tsym, prices)),
    0
  );
  return formatFloat(sum);
}

const mapStateToProps = state => {
  return {
    selected: state.selected,
    totalUSD: calcTotalSum(state.positions, state.prices, 'USD'),
    totalBTC: calcTotalSum(state.positions, state.prices, 'BTC'),
  };
};

export const ToolbarContainer = connect(mapStateToProps, {
  deletePosition,
  clearSelected,
  openEditor,
  openSettings,
})(Toolbar);
