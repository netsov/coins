// const TICKER_ALL = 'https://api.coinmarketcap.com/v1/ticker/?limit=0';
const TICKER_ALL =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const TICKER_SPECIFIC = __id =>
  `https://api.coinmarketcap.com/v1/ticker/${__id}/`;

const AUTH_HEADER = 'X-CMC_PRO_API_KEY';

export async function fetchTickerAll() {
  return await (await fetch(TICKER_ALL, {
    cache: 'no-store',
    headers: { [AUTH_HEADER]: process.env.REACT_APP_COINMARKETCAP_API_KEY },
  })).json();
}

export async function fetchTicker(__id) {
  return await (await fetch(TICKER_SPECIFIC(__id), {
    cache: 'no-store',
    headers: { [AUTH_HEADER]: process.env.REACT_APP_COINMARKETCAP_API_KEY },
  })).json();
}
