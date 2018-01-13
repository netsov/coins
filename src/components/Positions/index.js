import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import DocumentTitle from 'react-document-title';

import { ChartContainer } from '../../containers/ChartContainer';
import { getTableColumns } from './utils';
import { intervalMixin } from '../../utils/mixins';

import './style.css';

import { formatFloat } from '../../utils';

import {
  Table,
  Button,
  Divider,
  Popconfirm,
  message,
  // Switch,
  // Form,
  Radio,
  Tooltip,
} from 'antd';

const RadioGroup = Radio.Group;

export class Positions extends intervalMixin(Component) {
  state = {
    expanded: [],
    currency: 'USD',
  };

  shouldComponentUpdate(nextProps, nextState) {
    const propsKeys = [
      // 'positions',
      'selected',
      'totalUSD',
      'totalBTC',
      'delta',
    ];
    const stateKeys = ['expanded', 'currency'];

    return (
      stateKeys.some(key => !isEqual(this.state[key], nextState[key])) ||
      propsKeys.some(key => !isEqual(this.props[key], nextProps[key]))
    );
  }

  async componentDidMount() {
    this.props.getSettings();
    this.props.getPositions();
    this.watchPrices();
  }

  watchPrices(force) {
    if (force) this.resetInterval();
    this.props.getTickerData();
    this.intervalID = setInterval(this.props.getTickerData, this.interval);
  }

  handleCurrencyChange = e => {
    this.setState({
      currency: e.target.value,
    });
  };

  renderHeader = () => {
    const RadioTooltip = ({ children }) => (
      <Tooltip
        title="Affects price and market value columns"
        placement="topLeft"
      >
        {children}
      </Tooltip>
    );
    return (
      <DocumentTitle title={`$${this.props.totalUSD} · Crypto Assets`}>
        <div className="table-header">
          <span>
            Total:&nbsp;${this.props.totalUSD}
            <Divider type="vertical" />
            {this.props.totalBTC}&nbsp;BTC
          </span>

          <div className="table-header--left">
            <RadioGroup
              onChange={this.handleCurrencyChange}
              value={this.state.currency}
            >
              <RadioTooltip>
                <Radio value="USD">USD</Radio>
              </RadioTooltip>
              <RadioTooltip>
                <Radio value="BTC">BTC</Radio>
              </RadioTooltip>
            </RadioGroup>
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
              type="primary"
              // ghost={this.props.selected.length !== 1}
              ghost
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
  };

  renderFooter = () => {
    const { positions, delta } = this.props;
    const minutes = Math.ceil(delta / 60);
    const updated =
      delta > 30
        ? `${minutes} minute${minutes > 1 ? 's' : ''} ago`
        : 'just now';
    return (
      <div className="table-footer">
        <span>
          {positions.length}&nbsp;asset{positions.length === 1 ? '' : 's'}
        </span>
        <em>Updated:&nbsp;{updated}</em>
      </div>
    );
  };

  renderExpandedRow = record => {
    return (
      <ChartContainer
        positionId={record.position.__id}
        expanded={
          !!this.state.expanded.find(__id => __id === record.position.__id)
        }
      />
    );
  };

  handleExpand = (on, record) =>
    this.setState(prevState => {
      return {
        expanded: on
          ? [...prevState.expanded, record.position.__id]
          : prevState.expanded.filter(__id => __id !== record.position.__id),
      };
    });

  render() {
    const { positions, selected, toggleSelected, toggleSelectAll } = this.props;
    console.log('Positions rendered');

    const dataSource = positions.map(p => {
      const USD = p.__meta.price_usd;
      const BTC = p.__meta.price_btc;
      return {
        key: p.__id,
        name: p.__meta,
        balance: p.quantity,
        usdValue: formatFloat(USD * p.quantity, 0),
        btcValue: formatFloat(BTC * p.quantity),
        priceBTC: formatFloat(BTC),
        priceUSD: formatFloat(USD, 2),
        change1h: p.__meta.percent_change_1h,
        change24h: p.__meta.percent_change_24h,
        change7d: p.__meta.percent_change_7d,
        marketCapUSD: formatFloat(p.__meta.market_cap_usd, 0),
        position: p,
      };
    });

    return (
      <Table
        // bordered={true}
        columns={getTableColumns(this.state.currency)}
        dataSource={dataSource}
        pagination={false}
        title={this.renderHeader}
        size="small"
        expandRowByClick={true}
        expandedRowRender={this.renderExpandedRow}
        expandedRowKeys={this.state.expanded}
        onExpand={this.handleExpand}
        rowSelection={{
          selectedRowKeys: selected,
          onSelect: record => toggleSelected(record.key),
          onSelectAll: toggleSelectAll,
        }}
        footer={this.renderFooter}
      />
    );
  }
}
