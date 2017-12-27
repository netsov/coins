import React, { Component } from 'react';
import classNames from 'classnames';
import isEqual from 'lodash.isequal';

import './style.css';

import {
  // ZOOM_CHOICES_INDEX,
  COIN_IMG_URL,
  getCoinPrice,
  formatFloat,
  getCoinChange,
} from '../../utils';

import { Table, Button, Tooltip } from 'antd';

export class Positions extends Component {
  interval = 1000 * 60;
  intervalID = null;

  componentWillUnmount() {
    this.resetInterval();
  }

  resetInterval() {
    this.intervalID && clearInterval(this.intervalID);
  }

  async componentDidMount() {
    this.props.getSettings();
    this.props.getPositions();
    this.updatePrices(this.props.positions);
  }

  async componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.positions, nextProps.positions)) {
      this.updatePrices(nextProps.positions, true);
    }
  }

  updatePrices(positions, force) {
    if (force) this.resetInterval();
    this.props.getPrices(positions, force);
    this.intervalID = setInterval(
      () => this.props.getPrices(positions),
      this.interval
    );
  }

  render() {
    const {
      positions,
      prices,
      updatePosition,
      selected,
      toggleSelected,
      // toggleSelectAll,
      showCharts,
      totalUSD,
      totalBTC,
    } = this.props;
    console.log('Positions rendered');

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
              <img src={imgUrl} height="24" width="24" />&nbsp;&nbsp;
              <span>{text}</span>
            </Tooltip>
          </span>
        ),
      },
      {
        title: 'Balance',
        dataIndex: 'balance',
        sorter: sorter('balance'),
      },
      {
        title: 'USD Value',
        dataIndex: 'usdValue',
        sorter: sorter('usdValue'),
      },
      {
        title: 'BTC Value',
        dataIndex: 'btcValue',
        sorter: sorter('btcValue'),
      },
      {
        title: 'Price BTC',
        dataIndex: 'priceBTC',
        sorter: sorter('priceBTC'),
      },
      {
        title: 'Change (24hr)',
        dataIndex: 'changeBTC',
        render: change,
        sorter: sorter('changeBTC'),
      },
      {
        title: 'Price USD',
        dataIndex: 'priceUSD',
        sorter: sorter('priceUSD'),
      },
      {
        title: 'Change (24hr)',
        dataIndex: 'changeUSD',
        render: change,
        sorter: sorter('changeUSD'),
      },
    ];
    const data = positions.map(p => {
      const USD = getCoinPrice(p.symbol, 'USD', prices);
      const BTC = getCoinPrice(p.symbol, 'BTC', prices);
      return {
        key: p.__id,
        name: [p.symbol, COIN_IMG_URL(p.coin.ImageUrl), p.coin.FullName],
        balance: p.quantity,
        usdValue: formatFloat(USD * p.quantity),
        btcValue: formatFloat(BTC * p.quantity),
        priceBTC: formatFloat(BTC),
        priceUSD: formatFloat(USD),
        changeBTC: getCoinChange(p.symbol, 'BTC', prices),
        changeUSD: getCoinChange(p.symbol, 'USD', prices),
      };
    });

    const header = () => (
      <div className="table-header">
        <span>
          Total: ${totalUSD} | {totalBTC} BTC
        </span>
        <Button className="editable-add-btn" onClick={() => {}} type="primary">
          Add
        </Button>
      </div>
    );

    return (
      <main>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          title={header}
        />
      </main>
    );
    // return (
    //   <main className="mdc-toolbar-fixed-adjust">
    //     <ul
    //       className={classNames({
    //         'positions-container': true,
    //         'positions-container--compact': true,
    //       })}
    //     >
    //       {positions.map(position => (
    //         <li key={position.__id}>
    //           <Position
    //             position={position}
    //             prices={prices}
    //             selected={selected}
    //             updatePosition={updatePosition}
    //             toggleSelected={toggleSelected}
    //             showChart={showCharts}
    //           />
    //         </li>
    //       ))}
    //     </ul>
    //     <FAB handleClick={() => this.props.openEditor()}>
    //       <Add />
    //     </FAB>
    //   </main>
    // );
  }
}
