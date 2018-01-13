import * as storage from '../utils/localStorage';
import isEqual from 'lodash.isequal';
import { isExpired, getTimestamp } from '../utils';
import { fetchTicker } from '../utils/coinmarketcap';

export const GET_TICKER = 'GET_TICKER';

export const getTickerData = (force = false) => async (dispatch, getState) => {
  let { timestamp, data } = storage.getTickerData();
  const { positions } = getState();
  const force = !isEqual(positions.map(p => p.__id), data.map(i => i.id));
  if (force || !timestamp || isExpired(timestamp, 5)) {
    if (data) {
      dispatch({
        type: GET_TICKER,
        data,
        timestamp,
      });
    }

    data = (await Promise.all(positions.map(p => fetchTicker(p.__id)))).reduce(
      (data, response) => [...data, ...response],
      []
    );
    timestamp = getTimestamp();
    storage.updateTickerData({
      data,
      timestamp,
    });
  }

  dispatch({
    type: GET_TICKER,
    data,
    timestamp,
  });
};
