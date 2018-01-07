import * as storage from '../utils/localStorage';
import { isExpired, getTimestamp } from '../utils';
import { fetchTickerData } from '../utils/coinmarketcap';

export const GET_TICKER = 'GET_TICKER';

export const getTickerData = () => async (dispatch, getState) => {
  let { timestamp, data } = storage.getTickerData();
  if (!timestamp || isExpired(timestamp, 5)) {
    if (data) {
      dispatch({
        type: GET_TICKER,
        data,
      });
    }

    data = await fetchTickerData();
    storage.updateTickerData({
      data: data.filter(i =>
        getState().positions.find(({ __id }) => __id === i.id)
      ),
      // data,
      timestamp: getTimestamp(),
    });
  }

  dispatch({
    type: GET_TICKER,
    data,
  });
};
