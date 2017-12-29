import * as storage from '../utils/localStorage';
import { fetchHisto, isExpired, getTimestamp, HISTO_KEY } from '../utils';

export const GET_HISTO = 'GET_HISTO';

export const getHisto = (fsym, tsym, zoom) => async dispatch => {
  const key = HISTO_KEY(fsym, tsym, zoom);
  let { timestamp, data } = storage.getHisto(key);

  if (!timestamp || isExpired(timestamp, 5)) {
    if (data) {
      dispatch({
        type: GET_HISTO,
        data,
        key,
      });
    }

    data = await fetchHisto(fsym, tsym, zoom);
    console.log('data', data);
    storage.updatHisto(key, {
      timestamp: getTimestamp(),
      data,
    });
  }

  dispatch({
    type: GET_HISTO,
    data,
    key,
  });
};
