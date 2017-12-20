import * as storage from '../utils/localStorage';
import { fetchPrices, isExpired, getTimestamp } from '../utils';

export const GET_PRICES = 'GET_PRICES';

export const getPrices = (positions, force) => async dispatch => {
  if (positions.length === 0) return;
  let { timestamp, raw } = storage.getPrices();
  if (force || !timestamp || isExpired(timestamp)) {
    const response = await fetchPrices(positions);
    raw = response.RAW;
    storage.updatePrices({
      raw,
      timestamp: getTimestamp(),
    });
  }

  dispatch({
    type: GET_PRICES,
    prices: raw,
  });
};
