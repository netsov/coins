import { connect } from 'react-redux';

import { Editor } from '../components/Editor';
import { closeEditor } from '../actions';

const mapStateToProps = state => {
  return {
    item: state.position,
    ticker: state.ticker,
  };
};

export const EditorContainerHOC = updateItem =>
  connect(mapStateToProps, {
    updateItem,
    closeEditor,
  })(Editor);
