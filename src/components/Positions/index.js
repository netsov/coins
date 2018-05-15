import React, { Component, Fragment } from 'react';
import isEqual from 'lodash.isequal';
import DocumentTitle from 'react-document-title';

import { getTableColumns } from './utils';
import { trackGA } from '../../utils';

import './style.css';

import { formatFloat } from '../../utils';

import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import Radio from 'antd/lib/radio';
import Divider from 'antd/lib/divider';
import Tooltip from 'antd/lib/tooltip';

import PositionChartContainer from '../../containers/PositionChartContainer';
import { DeltaContainer } from '../../containers/DeltaContainer';

import { LoadablePositionEditorContainer } from '../../loadables';

const RadioGroup = Radio.Group;

const RadioTooltip = ({ children }) => (
  <Tooltip title="Affects price and market value columns" placement="topLeft">
    {children}
  </Tooltip>
);

export class Positions extends Component {
  state = {
    expanded: [],
    currency: 'USD',
  };

  shouldComponentUpdate(nextProps, nextState) {
    const propsKeys = [
      // 'positions',
      'editorIsOpened',
      'selected',
      'totalUSD',
      'totalBTC',
    ];
    const stateKeys = ['expanded', 'currency'];

    return (
      stateKeys.some(key => !isEqual(this.state[key], nextState[key])) ||
      propsKeys.some(key => !isEqual(this.props[key], nextProps[key]))
    );
  }

  componentDidMount() {
    trackGA('positions');
  }

  handleCurrencyChange = e => {
    this.setState({
      currency: e.target.value,
    });
  };

  renderHeader = () => {
    return (
      <DocumentTitle
        title={
          (this.props.positions.length ? `$${this.props.totalUSD} · ` : '') +
          'Crypto Assets'
        }
      >
        <div className="positions-table-header">
          {this.props.positions.length ? (
            <span>
              Total:&nbsp;${this.props.totalUSD}
              <Divider type="vertical" />
              {this.props.totalBTC}&nbsp;BTC
            </span>
          ) : (
            <span />
          )}

          <div className="positions-table-header--right">
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
    const { positions } = this.props;
    if (!positions.length) return;
    return (
      <div className="positions-table-footer">
        <span>
          {positions.length}&nbsp;asset{positions.length === 1 ? '' : 's'}
        </span>
        <DeltaContainer />
      </div>
    );
  };

  renderExpandedRow = record => {
    return (
      <PositionChartContainer
        itemId={record.position.__id}
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
    const {
      positions,
      selected,
      toggleSelected,
      toggleSelectAll,
      tickerById,
    } = this.props;
    console.log('Positions rendered');

    const dataSource = positions.map(item => {
      const __meta = tickerById[item.__id];
      const USD = __meta.price_usd;
      const BTC = __meta.price_btc;
      return {
        key: item.__id,
        name: __meta,
        balance: item.quantity,
        usdValue: formatFloat(USD * item.quantity, 0),
        btcValue: formatFloat(BTC * item.quantity),
        priceBTC: formatFloat(BTC),
        priceUSD: formatFloat(USD, 2),
        change1h: __meta.percent_change_1h,
        change24h: __meta.percent_change_24h,
        change7d: __meta.percent_change_7d,
        marketCapUSD: formatFloat(__meta.market_cap_usd, 0),
        position: item,
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

        {this.props.editorIsOpened && <LoadablePositionEditorContainer />}
      </Fragment>
    );
  }
}
