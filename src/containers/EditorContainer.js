import React from 'react';
import { connect } from 'react-redux';

import { Editor } from '../components/Editor';
import {
  updateItem,
  closeEditor,
  getTickerData
} from '../actions';

const mapStateToProps = state => {
  return {
    position: state.position,
    ticker: state.ticker,
  }
};

export const EditorContainer = connect(mapStateToProps, {
  updatePosition: updateItem,
  closeEditor,
  getTickerData,
})(props => (props.position ? <Editor {...props} /> : null));
