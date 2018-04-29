import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './containers/AppContainer';

import { Provider } from 'react-redux';
// import registerServiceWorker from './registerServiceWorker';

import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();

if (module.hot) {
  module.hot.accept('./containers/AppContainer', () => {
    const NextRoot = require('./containers/AppContainer').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextRoot />
      </Provider>,
      document.getElementById('root')
    );
  });
}
