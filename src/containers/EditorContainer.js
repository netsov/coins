import React from 'react';
import { connect } from 'react-redux';

import { Editor } from '../components/Editor';
import {
  createPosition,
  updatePosition,
  closeEditor,
  getCoins,
} from '../actions';

const mapStateToProps = state => {
  return {
    position: state.position,
    coins: Object.values(state.coins).sort(
      (a, b) => parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10)
    ),
  };
};

export const EditorContainer = connect(mapStateToProps, {
  createPosition,
  updatePosition,
  closeEditor,
  getCoins,
})(props => (props.position ? <Editor {...props} /> : null));
