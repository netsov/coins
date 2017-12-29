import * as storage from '../utils/localStorage';
import { fetchPrices, isExpired, getTimestamp } from '../utils';

export const GET_PRICES = 'GET_PRICES';

export const getPrices = (positions, force) => async dispatch => {
  if (positions.length === 0) return;
  let { timestamp, data } = storage.getHisto();
  if (force || !timestamp || isExpired(timestamp, 1)) {
    if (data) {
      dispatch({
        type: GET_PRICES,
        prices: data,
      });
    }

    const response = await fetchPrices(positions);
    data = response.RAW;
    storage.updatePrices({
      data,
      timestamp: getTimestamp(),
    });
  }

  dispatch({
    type: GET_PRICES,
    prices: data,
  });
};
