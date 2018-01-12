import React from 'react';
import { connect } from 'react-redux';

import { Editor } from '../components/Editor';
import {
  updatePosition,
  closeEditor,
  getTickerData
} from '../actions';

const mapStateToProps = state => {
  return {
    position: state.position
  };
};

export const EditorContainer = connect(mapStateToProps, {
  updatePosition,
  closeEditor,
  getTickerData,
})(props => (props.position ? <Editor {...props} /> : null));
