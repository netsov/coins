import * as storage from '../utils/localStorage';
import { isExpired, getTimestamp } from '../utils';
import { fetchTickerAll } from '../utils/coinmarketcap';

export const GET_TICKER = 'GET_TICKER';

export const getTickerData = () => async (dispatch, getState) => {
  let { data, timestamp } = storage.getFromLocalStorage('ticker') || {};
  const { ticker } = getState();
  // const force = !isEqual(positions.map(p => p.__id), data.map(i => i.id));
  if (!ticker || !timestamp || isExpired(timestamp, 5)) {
    data = await fetchTickerAll();
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
