import * as storage from '../utils/localStorage';
import { fetchHisto, isExpired, getTimestamp, HISTO_KEY } from '../utils';

export const GET_HISTO_REQUEST = 'GET_HISTO_REQUEST';
export const GET_HISTO_SUCCESS = 'GET_HISTO_SUCCESS';

export const getHisto = (fsym, tsym, zoom, __id) => async dispatch => {
  const key = HISTO_KEY(fsym, tsym, zoom);
  let { timestamp, data } = storage.getHisto(key);

  if (!timestamp || isExpired(timestamp, 5)) {
    if (data) {
      dispatch({
        type: GET_HISTO_SUCCESS,
        data,
        key,
        __id,
      });
    }

    dispatch({
      type: GET_HISTO_REQUEST,
      __id,
    });

    data = await fetchHisto(fsym, tsym, zoom);
    storage.updatHisto(key, {
      timestamp: getTimestamp(),
      data,
    });
  }

  if (data) {
    dispatch({
      type: GET_HISTO_SUCCESS,
      data,
      key,
      __id,
    });
  }
};
