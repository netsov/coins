import React, { Component } from 'react';

import Loadable from 'react-loadable';
import Tabs from 'antd/lib/tabs';
import { intervalMixin } from '../utils/mixins';
import { LoginWarningContainer } from '../containers/LoginWarningContainer';
import { LoginAvatarContainer } from '../containers/LoginAvatarContainer';

const LoadablePositionsContainer = Loadable({
  loader: () => import('../containers/PositionsContainer'),
  loading: () => <p>Loading...</p>,
});

const LoadablePieContainer = Loadable({
  loader: () => import('../containers/PieContainer'),
  loading: () => <p>Loading...</p>,
});

const LoadableWatchListContainer = Loadable({
  loader: () => import('../containers/WatchListContainer'),
  loading: () => <p>Loading...</p>,
});

export class App extends intervalMixin(Component) {
  componentDidMount() {
    this.props.getUser();
    this.watchPrices();
  }

  watchPrices() {
    this.props.getTickerData();
    this.intervalID = setInterval(this.props.getTickerData, this.interval);
  }

  render() {
    console.log('App rendered');
    return (
      <main>
        <LoginWarningContainer />
        <Tabs type="card" tabBarExtraContent={<LoginAvatarContainer />}>
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
