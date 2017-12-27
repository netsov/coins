import { connect } from 'react-redux';

import { Toolbar } from '../components/Toolbar';
import { deletePosition, clearSelected, openEditor } from '../actions';
import { calcTotalSum } from '../utils';
import { openSettings } from '../actions';



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
