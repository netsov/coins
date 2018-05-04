import React from 'react';
import classNames from 'classnames';
import Tooltip from 'antd/lib/tooltip';

const change = change =>
  change ? (
    <span
      className={classNames('change--positive', {
        'change--negative': change < 0,
      })}
    >
      <data>
        {change > 0 ? '+' : '-'}
        {Math.abs(change)}%
      </data>
    </span>
  ) : null;

const sorter = column => (a, b) => a[column] - b[column];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    // width: 100,
    render: ({ symbol, name, id }) => (
      <span>
        <Tooltip title={`${name} (${symbol})`} placement="topLeft">
          {/*<img*/}
          {/*src={`https://files.coinmarketcap.com/static/img/coins/32x32/${id}.png`}*/}
          {/*height="24"*/}
          {/*width="24"*/}
          {/*alt=""*/}
          {/*/>&nbsp;&nbsp;*/}
          <span>{symbol}</span>
        </Tooltip>
      </span>
    ),
  },
  {
    title: 'Price USD',
    dataIndex: 'priceUSD',
    sorter: sorter('priceUSD'),
    render: s => `$${s}`,
    className: 'column--align',
    // width: 110,
  },
  {
    title: 'Price BTC',
    dataIndex: 'priceBTC',
    sorter: sorter('priceBTC'),
    render: s => `${s} BTC`,
    className: 'column--align',
  },
  {
    title: '% 1h',
    dataIndex: 'change1h',
    render: change,
    sorter: sorter('change1h'),
    className: 'column--align',
  },
  {
    title: '% 24h',
    dataIndex: 'change24h',
    render: change,
    sorter: sorter('change24h'),
    className: 'column--align',
  },
  {
    title: '% 7d',
    dataIndex: 'change7d',
    render: change,
    sorter: sorter('change7d'),
    className: 'column--align',
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCapUSD',
    render: s => `$${s.toLocaleString()}`,
    sorter: sorter('marketCapUSD'),
    className: 'column--align',
    defaultSortOrder: 'descend',
  },
];

export function getTableColumns(currency) {
  return columns;
}
