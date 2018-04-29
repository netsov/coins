import { connect } from 'react-redux';

import { Editor } from '../components/PositionEditor';

const mapStateToProps = reducerName => state => {
  return {
    item: state[reducerName].formItem,
    ticker: state.ticker,
  };
};

export const EditorContainerHOC = (updateItem, closeEditor, reducerName) =>
  connect(mapStateToProps(reducerName), {
    updateItem,
    closeEditor,
  })(Editor);
