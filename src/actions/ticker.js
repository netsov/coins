import * as storage from '../utils/localStorage';
import { isExpired, getTimestamp } from '../utils';
import { fetchTickerAll } from '../utils/coinmarketcap';

export const GET_TICKER = 'GET_TICKER';

export const getTickerData = () => async (dispatch, getState) => {
  let { data, timestamp } = storage.getFromLocalStorage('ticker') || {};
  const { ticker, positions } = getState();
  // const force = !isEqual(positions.map(p => p.__id), data.map(i => i.id));
  if (!ticker || !timestamp || isExpired(timestamp, 5)) {
    if (data)
      dispatch({
        type: GET_TICKER,
        data,
        timestamp,
      });

    data = await fetchTickerAll();
    timestamp = getTimestamp();

    storage.updateTickerData({
      data,
      timestamp,
    });

    const tickerById = data.reduce(
      (acc, next) => ({ ...acc, [next.id]: next }),
      {}
    );

    storage.storeToLocalStorage(
      'positions',
      positions.map(p => ({ ...p, __meta: tickerById[p.__id] }))
    );
  }

  dispatch({
    type: GET_TICKER,
    data,
    timestamp,
  });
};
