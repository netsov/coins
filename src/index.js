import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Raven from 'raven-js';
import ReactGA from 'react-ga';

import AppContainer from './containers/AppContainer';
import { store } from './store';

import './index.css';

import { register as registerServiceWorker } from './registerServiceWorker';

if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.REACT_APP_SENTRY_URL).install();
  ReactGA.initialize(process.env.REACT_APP_GA);
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

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
