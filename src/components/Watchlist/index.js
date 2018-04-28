import React, { Component, Fragment } from 'react';
import isEqual from 'lodash.isequal';
import Loadable from 'react-loadable';

import { getTableColumns } from './utils';
// import { intervalMixin } from '../../utils/mixins';

import './style.css';

import { formatFloat } from '../../utils';

import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';

const LoadableChartContainer = Loadable({
  loader: () => import('../../containers/WatchlistChartContainer'),
  loading: () => <p>Loading...</p>,
});

const LoadableEditorContainer = Loadable({
  loader: () => import('../../containers/WatchlistEditorContainer'),
  loading: () => <div />,
});

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

  async componentDidMount() {
    this.props.getWatchlistItems();
  }

  renderHeader = () => {
    return (
      <div className="table-header">
        <span />

        <div className="table-header--left">
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
    );
  };

  renderExpandedRow = record => {
    return (
      <LoadableChartContainer
        item={record.item}
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
    const { items, selected, toggleSelected, toggleSelectAll } = this.props;
    console.log('Watchlist rendered');

    const dataSource = items.map(p => {
      const USD = p.__meta.price_usd;
      const BTC = p.__meta.price_btc;
      return {
        key: p.__id,
        name: p.__meta,
        priceBTC: formatFloat(BTC),
        priceUSD: formatFloat(USD, 2),
        change1h: p.__meta.percent_change_1h,
        change24h: p.__meta.percent_change_24h,
        change7d: p.__meta.percent_change_7d,
        marketCapUSD: formatFloat(p.__meta.market_cap_usd, 0),
        item: p,
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
        />
        {this.props.editorIsOpened && <LoadableEditorContainer />}
      </Fragment>
    );
  }
}
