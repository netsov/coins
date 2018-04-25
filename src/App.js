import React from 'react';

import { PositionsContainer } from './containers/PositionsContainer';
import { PositionEditorContainer, WatchlistEditorContainer } from './containers/EditorContainer';
import { PieContainer } from './containers/PieContainer';
import { WatchListContainer } from './containers/WatchListContainer';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export const App = () => (
  <main>
    <Tabs type="card">
      <TabPane tab="Assets" key="1">
        <PositionsContainer />
        <PositionEditorContainer />
      </TabPane>
      <TabPane tab="Pie Chart" key="2">
        <PieContainer />
      </TabPane>
      <TabPane tab="Watchlist" key="3">
        <WatchListContainer />
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
