export async function getFromCache(url) {
  const storage = window.localStorage;
  const cacheJSON = storage.getItem(url);
  const cache = cacheJSON && JSON.parse(cacheJSON);
  const now = new Date().valueOf();
  if (cache) {
    const { response, ts } = cache;
    const deltaMin = (now - ts) * 0.001 / 60;
    if (deltaMin < 5) return response;
  }
  const response = await (await fetch(url)).json();
  storage.setItem(
    url,
    JSON.stringify({
      response: response,
      ts: now,
    })
  );
  return response;
}

export const HYSTO_MINUTE = (fsym, tsym, limit) =>
  `https://min-api.cryptocompare.com/data/histominute?fsym=${fsym}&tsym=${tsym}&limit=${limit}`;

export const HYSTO_HOUR = (fsym, tsym, limit) =>
  `https://min-api.cryptocompare.com/data/histohour?fsym=${fsym}&tsym=${tsym}&limit=${limit}`;

export const HYSTO_DAY = (fsym, tsym, limit) =>
  `https://min-api.cryptocompare.com/data/histoday?fsym=${fsym}&tsym=${tsym}&${
    limit ? `limit=${limit}` : 'allData=true'
  }`;

export const COIN_LIST = 'https://min-api.cryptocompare.com/data/all/coinlist';

export const TRADING_PAIRS = fsym =>
  `https://min-api.cryptocompare.com/data/top/pairs?fsym=${fsym}&limit=100`;

export const COIN_PRICE = (fsym, tsym) =>
  `https://min-api.cryptocompare.com/data/price?fsym=${fsym}&tsyms=${tsym}`;

export const COIN_IMG_URL = url => `https://www.cryptocompare.com/${url}`;

export function calcTotal(quantity, price) {
  return quantity * price;
}
