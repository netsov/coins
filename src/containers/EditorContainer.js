import React from 'react';
import { connect } from 'react-redux';

import { Editor } from '../components/Editor';
import { createPosition, updatePosition, closeEditor } from '../actions';

const mapStateToProps = state => {
  return {
    position: state.position,
  };
};

export const EditorContainer = connect(mapStateToProps, {
  createPosition,
  updatePosition,
  closeEditor,
})(props => (props.position ? <Editor {...props} /> : null));
