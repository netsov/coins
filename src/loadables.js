import React from 'react';
import Loadable from 'react-loadable';

export const LoadablePositionsContainer = Loadable({
  loader: () => import('./containers/PositionsContainer'),
  loading: () => <p>Loading...</p>,
});

export const LoadablePieContainer = Loadable({
  loader: () => import('./containers/PieContainer'),
  loading: () => <p>Loading...</p>,
});

export const LoadableWatchListContainer = Loadable({
  loader: () => import('./containers/WatchListContainer'),
  loading: () => <p>Loading...</p>,
});

export const LoadablePositionEditorContainer = Loadable({
  loader: () => import('./containers/PositionEditorContainer'),
  loading: () => <div />,
});

export const LoadableWatchlistEditorContainer = Loadable({
  loader: () => import('./containers/WatchlistEditorContainer'),
  loading: () => <div />,
});
