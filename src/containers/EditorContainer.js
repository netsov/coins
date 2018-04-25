import React from 'react';
import { connect } from 'react-redux';

import { Editor } from '../components/Editor';
import { closeEditor } from '../actions';

import { updatePosition } from '../actions/positions';
import { updateWatchlistItem } from '../actions/watchlist';

const mapStateToProps = state => {
  return {
    item: state.position,
    ticker: state.ticker,
  };
};

const EditorContainer = updateItem =>
  connect(mapStateToProps, {
    updateItem,
    closeEditor,
  })(props => (props.item ? <Editor {...props} /> : null));

export const PositionEditorContainer = EditorContainer(updatePosition);
export const WatchlistEditorContainer = EditorContainer(updateWatchlistItem);
