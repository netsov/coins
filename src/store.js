/*eslint-env node*/
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// import { routerReducer } from 'react-router-redux';

import { reducers } from './reducers';

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);
  }
  const middleware = applyMiddleware(...middlewares);

  return createStore(combineReducers({ ...reducers }), middleware);
};

export const store = configureStore();
