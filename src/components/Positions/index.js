import React, { Component } from 'react';
// import classNames from 'classnames';
import isEqual from 'lodash.isequal';

import './style.css';

import { Position } from '../Position';
import { getTableColumns } from './utils';

import {
  // ZOOM_CHOICES_INDEX,
  COIN_IMG_URL,
  getCoinPrice,
  formatFloat,
  getCoinChange,
} from '../../utils';

import { Table, Button, Divider, Popconfirm, message } from 'antd';

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

  renderHeader = () => (
    <div className="table-header">
      <span>
        Total:&nbsp;${this.props.totalUSD}
        <Divider type="vertical" />
        {this.props.totalBTC}&nbsp;BTC
      </span>
      <div>
        <Popconfirm
          placement="topRight"
          title={`Delete ${this.props.selected.length} position${
            this.props.selected.length > 1 ? 's' : ''
          }?`}
          onConfirm={() => {
            this.props.deletePositions();
            message.info('Deleted');
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button disabled={this.props.selected.length < 1} type="danger" ghost>
            Delete
          </Button>
        </Popconfirm>

        <Button
          disabled={this.props.selected.length !== 1}
          onClick={this.props.openEditor}
          ghost={this.props.selected.length !== 1}
        >
          Edit
        </Button>
        <Button onClick={this.props.openEditor} type="primary" ghost>
          Add
        </Button>
      </div>
    </div>
  );

  render() {
    const {
      positions,
      prices,
      updatePosition,
      selected,
      toggleSelected,
      toggleSelectAll,
      showCharts,
    } = this.props;
    console.log('Positions rendered');

    const columns = getTableColumns();

    const data = positions.map(p => {
      const USD = getCoinPrice(p.symbol, 'USD', prices);
      const BTC = getCoinPrice(p.symbol, 'BTC', prices);
      return {
        key: p.__id,
        name: [p.symbol, COIN_IMG_URL(p.coin.ImageUrl), p.coin.FullName],
        balance: p.quantity,
        usdValue: formatFloat(USD * p.quantity, 2),
        btcValue: formatFloat(BTC * p.quantity),
        priceBTC: formatFloat(BTC),
        priceUSD: formatFloat(USD, 2),
        changeBTC: getCoinChange(p.symbol, 'BTC', prices),
        changeUSD: getCoinChange(p.symbol, 'USD', prices),
        position: p,
      };
    });

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        title={this.renderHeader}
        size="small"
        expandRowByClick={true}
        expandedRowRender={record => (
          <Position
            position={record.position}
            prices={prices}
            selected={selected}
            updatePosition={updatePosition}
            toggleSelected={toggleSelected}
            showChart={showCharts}
          />
        )}
        rowSelection={{
          selectedRowKeys: selected,
          onSelect: record => toggleSelected(record.key),
          onSelectAll: toggleSelectAll,
        }}
      />
    );
  }
}
