import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
// import registerServiceWorker from './registerServiceWorker';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextRoot />
      </Provider>,
      document.getElementById('root')
    );
  });
}
