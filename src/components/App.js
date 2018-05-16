import React, { Component } from 'react';

import Tabs from 'antd/lib/tabs';
import { intervalMixin } from '../utils/mixins';
import { AuthNotificationContainer } from '../containers/AuthNotificationContainer';
import { AvatarContainer } from '../containers/AvatarContainer';
import {
  LoadablePieContainer,
  LoadablePositionsContainer,
  LoadableWatchListContainer,
  LoadableWatchlistEditorContainer,
  LoadablePositionEditorContainer,
} from '../loadables';

import Progress from '../containers/ProgressContainer';

export class App extends intervalMixin(Component) {
  componentDidMount() {
    this.props.getUserAndItems();
    this.watchPrices();

    LoadablePieContainer.preload();
    LoadableWatchListContainer.preload();
    LoadableWatchlistEditorContainer.preload();
    LoadablePositionEditorContainer.preload();

    import('./highstock');
  }

  watchPrices() {
    this.props.getTickerData();
    this.intervalID = setInterval(this.props.getTickerData, this.interval);
  }

  render() {
    console.log('App rendered');
    return (
      <main>
        <AuthNotificationContainer />
        <Progress />
        <Tabs type="card" tabBarExtraContent={<AvatarContainer />}>
          <Tabs.TabPane tab="Assets" key="1">
            <LoadablePositionsContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Pie Chart" key="2">
            <LoadablePieContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Watchlist" key="3">
            <LoadableWatchListContainer />
          </Tabs.TabPane>
        </Tabs>
      </main>
    );
  }
}
