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
    render: ([text, imgUrl, fullName]) => (
      <span>
        <Tooltip title={fullName} placement="topLeft">
          <img src={imgUrl} height="24" width="24" alt="" />&nbsp;&nbsp;
          <span>{text}</span>
        </Tooltip>
      </span>
    ),
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    sorter: sorter('balance'),
    className: 'column--right',
  },
  {
    title: 'USD Value',
    dataIndex: 'usdValue',
    sorter: sorter('usdValue'),
    className: 'column--right',
  },
  {
    title: 'BTC Value',
    dataIndex: 'btcValue',
    sorter: sorter('btcValue'),
    className: 'column--right',
  },
  {
    title: 'Price BTC',
    dataIndex: 'priceBTC',
    sorter: sorter('priceBTC'),
    className: 'column--right',
    width: 130,
  },
  {
    title: 'Change (24hr)',
    dataIndex: 'changeBTC',
    render: change,
    sorter: sorter('changeBTC'),
    // className: 'column--right',
    width: 130,
  },
  {
    title: 'Price USD',
    dataIndex: 'priceUSD',
    sorter: sorter('priceUSD'),
    className: 'column--right',
    width: 110,
  },
  {
    title: 'Change (24hr)',
    dataIndex: 'changeUSD',
    render: change,
    sorter: sorter('changeUSD'),
    // className: 'column--right',
    width: 130,
  },
];

export function getTableColumns() {
  return columns;
}
