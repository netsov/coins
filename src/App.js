import React from 'react';

import Loadable from 'react-loadable';

import { PositionsContainer } from './containers/PositionsContainer';
import {
  PositionEditorContainer,
  WatchlistEditorContainer,
} from './containers/EditorContainer';

import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;

const LoadablePieContainer = Loadable({
  loader: () => import('./containers/PieContainer'),
  loading: () => <p>Loading...</p>,
});

const LoadableWatchListContainer = Loadable({
  loader: () => import('./containers/WatchListContainer'),
  loading: () => <p>Loading...</p>,
});

export const App = () => (
  <main>
    <Tabs type="card">
      <TabPane tab="Assets" key="1">
        <PositionsContainer />
        <PositionEditorContainer />
      </TabPane>
      <TabPane tab="Pie Chart" key="2">
        <LoadablePieContainer />
      </TabPane>
      <TabPane tab="Watchlist" key="3">
        <LoadableWatchListContainer />
        <WatchlistEditorContainer />
      </TabPane>
      <TabPane tab="Settings" key="4">
        {/*<SettingsContainer />*/}
      </TabPane>
      <TabPane tab="Donate" key="5">
        <p>Coming soon</p>
      </TabPane>
    </Tabs>
  </main>
);
