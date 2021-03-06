import React, { Component, Fragment } from 'react';
import isEqual from 'lodash.isequal';

import { getTableColumns } from './utils';
import { trackGA } from '../../utils';

import './style.css';

import { formatFloat } from '../../utils';

import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';

import WatchlistChartContainer from '../../containers/WatchlistChartContainer';
import { DeltaContainer } from '../../containers/DeltaContainer';

import { LoadableWatchlistEditorContainer } from '../../loadables';

export class Watchlist extends Component {
  state = {
    expanded: [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    const propsKeys = [
      'items',
      'selected',
      'totalUSD',
      'totalBTC',
      'editorIsOpened',
    ];
    const stateKeys = ['expanded', 'currency'];

    return (
      stateKeys.some(key => !isEqual(this.state[key], nextState[key])) ||
      propsKeys.some(key => !isEqual(this.props[key], nextProps[key]))
    );
  }

  componentDidMount() {
    trackGA('watchlist');
  }

  renderHeader = () => {
    return (
      <div className="watchlist-table-header">
        <div className="watchlist-table-header--right">
          <Popconfirm
            placement="topRight"
            title={`Delete ${this.props.selected.length} item${
              this.props.selected.length > 1 ? 's' : ''
            }?`}
            onConfirm={() => {
              this.props.deleteWatchlistItems();
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
          <Button onClick={this.props.openEditor} type="primary" ghost>
            Add
          </Button>
        </div>
      </div>
    );
  };

  renderFooter = () => {
    const { items } = this.props;
    if (!items.length) return;
    return (
      <div className="watchlist-table-footer">
        <DeltaContainer />
      </div>
    );
  };

  renderExpandedRow = record => {
    return (
      <WatchlistChartContainer
        itemId={record.item.__id}
        expanded={!!this.state.expanded.find(__id => __id === record.item.__id)}
      />
    );
  };

  handleExpand = (on, record) =>
    this.setState(prevState => {
      return {
        expanded: on
          ? [...prevState.expanded, record.item.__id]
          : prevState.expanded.filter(__id => __id !== record.item.__id),
      };
    });

  render() {
    const {
      items,
      selected,
      toggleSelected,
      toggleSelectAll,
      tickerById,
    } = this.props;
    console.log('Watchlist rendered');

    const dataSource = items.map(item => {
      const __meta = tickerById[item.__id];
      const USD = __meta.price_usd;
      const BTC = __meta.price_btc;
      return {
        key: item.__id,
        name: __meta,
        priceBTC: formatFloat(BTC),
        priceUSD: formatFloat(USD, 2),
        change1h: __meta.percent_change_1h,
        change24h: __meta.percent_change_24h,
        change7d: __meta.percent_change_7d,
        marketCapUSD: formatFloat(__meta.market_cap_usd, 0),
        item: item,
      };
    });

    return (
      <Fragment>
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
        {this.props.editorIsOpened && <LoadableWatchlistEditorContainer />}
      </Fragment>
    );
  }
}
