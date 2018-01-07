import React, { Component } from 'react';

import { PositionsContainer } from './containers/PositionsContainer';
import { EditorContainer } from './containers/EditorContainer';
// import { SettingsContainer } from './containers/SettingsContainer';
import { PieContainer } from './containers/PieContainer';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export class App extends Component {
  render() {
    return (
      <main>
        <Tabs type="card">
          <TabPane tab="Assets" key="1">
            <PositionsContainer />
            <EditorContainer />
          </TabPane>
          <TabPane tab="Pie Chart" key="2">
            <PieContainer />
          </TabPane>
          <TabPane tab="Watchlist" key="3">
            <p>Coming soon</p>
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
  }
}
