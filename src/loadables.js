import React from 'react';
import Loadable from 'react-loadable';

export const LoadablePositionsContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "plist" */ './containers/PositionsContainer'),
  loading: () => <p>Loading...</p>,
});

export const LoadablePieContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "pie" */ './containers/PieContainer'),
  loading: () => <p>Loading...</p>,
});

export const LoadableWatchListContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "wlist" */ './containers/WatchListContainer'),
  loading: () => <p>Loading...</p>,
});

export const LoadablePositionEditorContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "p-editor" */ './containers/PositionEditorContainer'),
  loading: () => <div />,
});

export const LoadableWatchlistEditorContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "w-editor" */ './containers/WatchlistEditorContainer'),
  loading: () => <div />,
});
