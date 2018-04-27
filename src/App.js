import React from 'react';

import Loadable from 'react-loadable';

import Tabs from 'antd/lib/tabs';

const LoadablePositionsContainer = Loadable({
  loader: () => import('./containers/PositionsContainer'),
  loading: () => <p>Loading...</p>,
});

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
      <Tabs.TabPane tab="Assets" key="1">
        <LoadablePositionsContainer />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Pie Chart" key="2">
        <LoadablePieContainer />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Watchlist" key="3">
        <LoadableWatchListContainer />
      </Tabs.TabPane>
      {/*<TabPane tab="Settings" key="4">*/}
      {/*/!*<SettingsContainer />*!/*/}
      {/*</TabPane>*/}
      {/*<TabPane tab="Donate" key="5">*/}
      {/*<p>Coming soon</p>*/}
      {/*</TabPane>*/}
    </Tabs>
  </main>
);
