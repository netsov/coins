const TICKER_ALL = 'https://api.coinmarketcap.com/v1/ticker/?limit=0';
const TICKER_SPECIFIC = __id => `https://api.coinmarketcap.com/v1/ticker/${__id}/`;

export async function fetchTickerAll() {
  return await (await fetch(TICKER_ALL, { cache: 'no-store' })).json()
}

export async function fetchTicker(__id) {
  return await (await fetch(TICKER_SPECIFIC(__id), { cache: 'no-store' })).json()
}
