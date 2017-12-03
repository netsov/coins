export async function getFromCache(url) {
  const storage = window.localStorage;
  let cache = storage.getItem(url);
  if (cache) {
    return JSON.parse(cache).response;
  } else {
    const response = await (await fetch(url)).json();
    storage.setItem(
      url,
      JSON.stringify({
        response: response,
        ts: new Date().valueOf(),
      })
    );
    return response;
  }
}

export const HYSTO_HOUR = (fsym, tsym, limit) =>
  `https://min-api.cryptocompare.com/data/histohour?fsym=${fsym}&tsym=${
    tsym
    }&limit=${limit}`;

export const HYSTO_DAY = (fsym, tsym, limit) =>
  `https://min-api.cryptocompare.com/data/histoday?fsym=${fsym}&tsym=${tsym}&${
    limit ? `limit=${limit}` : 'allData=true'
    }`;

export const SYMBOLS = 'https://min-api.cryptocompare.com/data/all/coinlist';

export const TRADING_PAIRS = fsym =>
  `https://min-api.cryptocompare.com/data/top/pairs?fsym=${fsym}&limit=100`;

export const PRICE = (fsym, tsym) =>
  `https://min-api.cryptocompare.com/data/price?fsym=${fsym}&tsyms=${tsym}`;