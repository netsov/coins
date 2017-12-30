import React, { Component } from 'react';
// import classNames from 'classnames';
import isEqual from 'lodash.isequal';
import DocumentTitle from 'react-document-title';
import './style.css';

// import { Position } from '../Position';
// import { Chart } from '../Chart';
import { ChartContainer } from '../../containers/ChartContainer';
import { getTableColumns } from './utils';
import { intervalMixin } from '../../utils/mixins';

import {
  // ZOOM_CHOICES_INDEX,
  COIN_IMG_URL,
  getCoinPrice,
  formatFloat,
  getCoinChange,
} from '../../utils';

import {
  Table,
  Button,
  Divider,
  Popconfirm,
  message,
  // Switch,
  // Form,
} from 'antd';

export class Positions extends intervalMixin(Component) {
  state = {
    expanded: [],
  };

  async componentDidMount() {
    this.props.getSettings();
    this.props.getPositions();
    this.watchPrices(this.props.positions);
  }

  async componentWillReceiveProps(nextProps) {
    if (
      !isEqual(
        this.props.positions.map(p => p.__id),
        nextProps.positions.map(p => p.__id)
      )
    ) {
      this.watchPrices(nextProps.positions, true);
    }
  }

  watchPrices(positions, force) {
    if (force) this.resetInterval();
    this.props.getPrices(positions, force);
    this.intervalID = setInterval(
      () => this.props.getPrices(positions),
      this.interval
    );
  }

  renderHeader = () => (
    <DocumentTitle title={`$${this.props.totalUSD} · Crypto Assets`}>
      <div className="table-header">
        <span>
          Total:&nbsp;${this.props.totalUSD}
          <Divider type="vertical" />
          {this.props.totalBTC}&nbsp;BTC
        </span>
        <div className="table-header--left">
          {/*<Form layout="inline">*/}
          {/*<Form.Item label="Charts">*/}
          {/*<Switch*/}
          {/*checked={*/}
          {/*this.state.expanded.length === this.props.positions.length*/}
          {/*}*/}
          {/*onChange={on => this.handleExpandAll(on)}*/}
          {/*/>*/}
          {/*</Form.Item>*/}
          {/*</Form>*/}

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
            <Button
              disabled={this.props.selected.length < 1}
              type="danger"
              ghost
            >
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
    </DocumentTitle>
  );

  handleExpand = (on, record) =>
    this.setState(prevState => {
      return {
        expanded: on
          ? [...prevState.expanded, record.position.__id]
          : prevState.expanded.filter(__id => __id !== record.position.__id),
      };
    });

  handleExpandAll = on =>
    this.setState((prevState, props) => {
      return {
        expanded: on ? props.positions.map(({ __id }) => __id) : [],
      };
    });

  render() {
    const {
      positions,
      prices,
      selected,
      toggleSelected,
      toggleSelectAll,
    } = this.props;
    console.log('Positions rendered');

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
        columns={getTableColumns()}
        dataSource={data}
        pagination={false}
        title={this.renderHeader}
        size="small"
        expandRowByClick={true}
        expandedRowRender={record => (
          <ChartContainer position={record.position} />
        )}
        // expandedRowKeys={this.state.expanded}
        // onExpand={this.handleExpand}
        rowSelection={{
          selectedRowKeys: selected,
          onSelect: record => toggleSelected(record.key),
          onSelectAll: toggleSelectAll,
        }}
      />
    );
  }
}
