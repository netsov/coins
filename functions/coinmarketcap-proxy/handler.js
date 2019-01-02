const fetch = require('node-fetch');

const TICKER_ALL = symbol =>
  `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=USD,BTC&symbol=${symbol}`;
const AUTH_HEADER = 'X-CMC_PRO_API_KEY';
const headers = { [AUTH_HEADER]: '' };

exports.proxy = async event => {
  const response = await fetch(
    TICKER_ALL(event['queryStringParameters']['symbol']),
    {
      cache: 'no-store',
      headers,
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify(await response.json()),
  };
};
