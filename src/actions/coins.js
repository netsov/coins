import * as storage from '../utils/localStorage';
import { fetchCoins, isExpired, getTimestamp } from '../utils';

export const GET_COINS = 'GET_COINS';

export const getCoins = () => async dispatch => {
  let { timestamp, data } = storage.getCoins();
  if (!timestamp || isExpired(timestamp, 1)) {
    if (data) {
      dispatch({
        type: GET_COINS,
        data,
      });
    }

    const response = await fetchCoins();
    data = response.Data;
    storage.updateCoins({
      data,
      timestamp: getTimestamp(),
    });
  }

  dispatch({
    type: GET_COINS,
    data,
  });
};
