import { connect } from 'react-redux';

import { Toolbar } from '../components/material/Toolbar';
import { deletePosition, clearSelected, openEditor } from '../actions';

const mapStateToProps = state => {
  return {
    selected: state.selected,
  };
};

export const ToolbarContainer = connect(mapStateToProps, {
  deletePosition,
  clearSelected,
  openEditor,
})(Toolbar);
