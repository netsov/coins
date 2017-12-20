import { getFromLocalStorage, storeToLocalStorage } from './localStorage';

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

const PRICE_MULTI = (fsyms, tsyms) =>
  `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fsyms}&tsyms=${tsyms}`;

const secondsInDay = 60 * 60 * 24;

export const ZOOM_CHOICES = [
  {
    name: '1d',
    url: HYSTO_MINUTE,
    // format: 'HH:mm',
    period: secondsInDay,
    limit: 60 * 24,
  },
  {
    name: '7d',
    url: HYSTO_HOUR,
    // format: 'MMM D',
    period: 7 * secondsInDay,
    limit: 7 * 24,
  },
  {
    name: '1m',
    url: HYSTO_DAY,
    // format: 'MMM D',
    period: 30 * secondsInDay,
    limit: 30,
  },
  {
    name: '3m',
    url: HYSTO_DAY,
    // format: 'MMM D',
    period: 90 * secondsInDay,
    limit: 90,
  },
  {
    name: '1y',
    url: HYSTO_DAY,
    // format: 'MMM D',
    period: 365 * secondsInDay,
    limit: 365,
  },
];

export const ZOOM_CHOICES_INDEX = ZOOM_CHOICES.reduce(
  (prev, next) => ({ ...prev, [next.name]: next }),
  {}
);

export function calcTotal(quantity, price) {
  return quantity * price;
}

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

export async function getHystoData(zoom, fsym, tsym = 'USD') {
  const { url, limit, period } = ZOOM_CHOICES_INDEX[zoom];
  const hystoURL = url(fsym, tsym, limit);
  const key = `${fsym}/${tsym}`;
  let data = getFromLocalStorage(key);

  if (data) {
    const now = Math.floor(Date.now() / 1000);
    const from = now - period;
    const oldest = data[0];
    if (oldest && oldest <= from) {
      const periodData = data && data.filter(([time, _]) => time > from);
      if (periodData) return data;
    }
  }

  const response = await (await fetch(hystoURL)).json();
  data = response.Data.map(item => [item.time, item.close]);

  storeToLocalStorage(key, data);
  return data;
}

export async function fetchPrices(positions) {
  const url = PRICE_MULTI(positions.map(p => p.symbol).join(','), 'USD,BTC');
  return await (await fetch(url, { cache: 'no-store' })).json();
}

export function getTimestamp() {
  return Math.ceil(new Date().valueOf() * 0.001);
}

export function isExpired(ts, minutes = 5) {
  const now = getTimestamp();
  const ageMinutes = (now - ts) / 60;
  return ageMinutes > minutes;
}

export function getCoinPrice(fsym, tsym, prices) {
  let { [tsym]: { PRICE } = {} } = (prices[fsym] && prices[fsym]) || {};
  return PRICE;
}

export function getCoinChange(fsym, tsym, prices) {
  let { [tsym]: { CHANGEPCT24HOUR } = {} } =
    (prices[fsym] && prices[fsym]) || {};
  return CHANGEPCT24HOUR && CHANGEPCT24HOUR.toFixed(2);
}

export function formatFloat(value) {
  let digits;
  if (value < 0.001) {
    digits = 6;
  } else if (value < 0.01) {
    digits = 4;
  } else if (value < 10) {
    digits = 2;
  }

  value = digits ? value.toFixed(digits) : Math.floor(value);

  return value;
}
