import React from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';

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
          <img
            src={`https://files.coinmarketcap.com/static/img/coins/32x32/${id}.png`}
            height="24"
            width="24"
            alt=""
          />&nbsp;&nbsp;
          <span>{symbol}</span>
        </Tooltip>
      </span>
    ),
  },
  {
    title: 'Holdings',
    dataIndex: 'balance',
    sorter: sorter('balance'),
    className: 'column--center',
  },
  {
    title: 'Holdings USD',
    dataIndex: 'usdValue',
    sorter: sorter('usdValue'),
    className: 'column--center',
  },
  {
    title: 'Holdings BTC',
    dataIndex: 'btcValue',
    sorter: sorter('btcValue'),
    className: 'column--center',
  },
  {
    title: 'Price USD',
    dataIndex: 'priceUSD',
    sorter: sorter('priceUSD'),
    className: 'column--center',
    // width: 110,
  },
  {
    title: 'Price BTC',
    dataIndex: 'priceBTC',
    sorter: sorter('priceBTC'),
    className: 'column--center',
    // width: 130,
  },
  {
    title: '% 1h',
    dataIndex: 'change1h',
    render: change,
    sorter: sorter('change1h'),
    className: 'column--center',
    // width: 130,
  },
  {
    title: '% 24h',
    dataIndex: 'change24h',
    render: change,
    sorter: sorter('change24h'),
    className: 'column--center',
    // width: 130,
  },
  {
    title: '% 7d',
    dataIndex: 'change7d',
    render: change,
    sorter: sorter('change7d'),
    className: 'column--center',
    // width: 130,
  },
];

export function getTableColumns() {
  return columns;
}
