const TICKER_ALL = 'https://api.coinmarketcap.com/v1/ticker/?limit=0';

export async function fetchTickerData() {
  const response = await (await fetch(TICKER_ALL, { cache: 'no-store' })).json();
  return response
}
