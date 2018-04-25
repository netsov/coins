import message from 'antd/lib/message';


const BASE_URL = 'https://min-api.cryptocompare.com/data/';

export const HISTO_MINUTE = (fsym, tsym, limit) =>
  `${BASE_URL}histominute?fsym=${fsym}&tsym=${tsym}&limit=${limit}`;

export const HISTO_HOUR = (fsym, tsym, limit) =>
  `${BASE_URL}histohour?fsym=${fsym}&tsym=${tsym}&limit=${limit}`;

export const HISTO_DAY = (fsym, tsym, limit) =>
  `${BASE_URL}histoday?fsym=${fsym}&tsym=${tsym}&${
    limit ? `limit=${limit}` : 'allData=true'
  }`;

export const COIN_LIST = `${BASE_URL}all/coinlist`;

// export const TRADING_PAIRS = fsym =>
//   `${BASE_URL}top/pairs?fsym=${fsym}&limit=100`;
//
// export const COIN_PRICE = (fsym, tsym) =>
//   `${BASE_URL}price?fsym=${fsym}&tsyms=${tsym}`;
//
// export const COIN_IMG_URL = url => `https://www.cryptocompare.com/${url}`;

const PRICE_MULTI = (fsyms, tsyms) =>
  `${BASE_URL}pricemultifull?fsyms=${fsyms}&tsyms=${tsyms}`;

export const HISTO_KEY = (fsym, tsym, zoom) => `${fsym}_${tsym}_${zoom}`;

export const ZOOM_CHOICES = [
  {
    name: '1d',
    url: HISTO_MINUTE,
    limit: 60 * 24,
  },
  {
    name: '7d',
    url: HISTO_HOUR,
    limit: 7 * 24,
  },
  {
    name: '1m',
    url: HISTO_HOUR,
    limit: 30 * 24,
  },
  {
    name: '3m',
    url: HISTO_DAY,
    limit: 90,
  },
  {
    name: '1y',
    url: HISTO_DAY,
    limit: 365,
  },
];

export async function callApi(url, opts) {
  const response = await (await fetch(url, opts)).json();
  if (response.Response === 'Error') message.error(response.Message);
  return response;
}

export const ZOOM_CHOICES_INDEX = ZOOM_CHOICES.reduce(
  (prev, next) => ({ ...prev, [next.name]: next }),
  {}
);

export async function fetchHisto(fsym, tsym, zoom = '1d') {
  const { url, limit } = ZOOM_CHOICES_INDEX[zoom];
  const response = await callApi(url(fsym, tsym, limit));
  return response.Data.map(item => [item.time, item.close]);
}

export async function fetchPrices(positions) {
  const url = PRICE_MULTI(positions.map(p => p.symbol).join(','), 'USD,BTC');
  return await callApi(url, { cache: 'no-store' });
}

export async function fetchCoins() {
  return await callApi(COIN_LIST);
}

export function getTimestamp() {
  return Math.ceil(new Date().valueOf() * 0.001);
}

export function isExpired(ts, minutes) {
  const now = getTimestamp();
  const ageMinutes = (now - ts) / 60;
  return ageMinutes > minutes;
}

export function formatFloat(value, digits = 8) {
  if (!value) return 0;
  value = parseFloat(value);
  value = digits ? value.toFixed(digits) : Math.floor(value);
  return value;
}
