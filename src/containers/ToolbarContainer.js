import { connect } from 'react-redux';

import { Toolbar } from '../components/Toolbar';
import { deletePosition, clearSelected, openEditor } from '../actions';
import { calcTotal } from '../utils';
import { openSettings } from '../actions';

const mapStateToProps = state => {
  return {
    selected: state.selected,
    total: state.positions.reduce((acc, next) => acc + calcTotal(next.quantity, next.prices.USD), 0)
  };
};

export const ToolbarContainer = connect(mapStateToProps, {
  deletePosition,
  clearSelected,
  openEditor,
  openSettings
})(Toolbar);
