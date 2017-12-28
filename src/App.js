import React, { Component, Fragment } from 'react';
import './components/Editor/style.css';

import { PositionsContainer } from './containers/PositionsContainer';
import { EditorContainer } from './containers/EditorContainer';
import { SettingsContainer } from './containers/SettingsContainer';

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
          <TabPane tab="Pie" key="2" />
          <TabPane tab="Watchlist" key="3" />
          <TabPane tab="Settings" key="4">
            <SettingsContainer />
          </TabPane>
          <TabPane tab="Donate" key="5">
            <p>Content of Tab Pane 3</p>
          </TabPane>
        </Tabs>
      </main>
    );
  }
}
