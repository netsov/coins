import React, { Component } from 'react';
import './style.css';

import { ActionButton } from '../material/ActionButton';
import { InputField } from '../material/InputField';
import { Card } from '../material/Card';

import {
  getFromCache,
  COIN_LIST,
  COIN_PRICE,
  TRADING_PAIRS,
} from '../../utils';

export class Editor extends Component {
  state = {
    coinList: [],
    toSymbols: [],
    symbol: '',
    tradePrice: '',
    tradeDate: '',
    currency: '',
    quantity: '',
  };

  async componentDidMount() {
    const response = await getFromCache(COIN_LIST);
    const coinList = Object.values(response.Data).sort(
      (a, b) => parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10)
    );

    this.setState({ coinList });
  }

  async componentWillUpdate(nextProps, nextState) {
    if (nextState.symbol !== this.state.symbol && nextState.symbol) {
      const response = await getFromCache(TRADING_PAIRS(nextState.symbol));
      const toSymbols = response.Data.map(pair => pair.toSymbol);
      this.setState({
        currency: '',
        toSymbols: toSymbols,
      });
    }

    if (
      nextState.currency !== this.state.currency &&
      nextState.currency &&
      this.state.toSymbols.indexOf(nextState.currency) !== -1
    ) {
      const response = await getFromCache(
        COIN_PRICE(nextState.symbol, nextState.currency)
      );
      const tradePrice = response[nextState.currency];
      if (tradePrice)
        this.setState({
          tradePrice,
        });
    }
  }

  handleChange = field => value => {
    this.setState({ [field]: value });
  };

  handleCancel = () => {};

  handleSave = () => {
    const {
      symbol,
      tradeDate,
      tradePrice,
      currency,
      quantity,
      coinList,
    } = this.state;

    const newPosition = {
      __id: new Date().valueOf(),
      symbol,
      tradePrice,
      tradeDate,
      currency,
      quantity,
      zoom: '1d',
      coin: coinList.find(c => c.Name === symbol),
    };

    this.props.savePosition(newPosition);
  };

  render() {
    return (
      <Card
        header={
          <section className="card-header right">
            <h1>??</h1>
            <h1>0.00%</h1>
          </section>
        }
      >
        <div className="CardContent">
          <div className="row">
            <datalist id="coinList">
              {this.state.coinList.map(coin => (
                <option key={coin.Name} value={coin.Name}>
                  {coin.FullName}
                </option>
              ))}
            </datalist>
            <InputField
              list="coinList"
              required={true}
              name="Symbol"
              initialValue={this.state.symbol}
              handleChange={this.handleChange('symbol')}
              placeholder="e.g. BTC, ETH, LTC"
            />
          </div>
          <div className="row">
            <InputField
              required={true}
              type="number"
              step={0.00000001}
              min={0}
              initialValue={this.state.quantity}
              handleChange={this.handleChange('quantity')}
              name="Quantity"
              placeholder="e.g. 0.001"
              rtl={false}
            />
          </div>
          <div className="row">
            <datalist id="toSymbols">
              {this.state.toSymbols.map(toSymbol => (
                <option key={toSymbol} value={toSymbol}>
                  {toSymbol}
                </option>
              ))}
            </datalist>
            <InputField
              list="toSymbols"
              required={true}
              initialValue={this.state.currency}
              handleChange={this.handleChange('currency')}
              name="Currency"
              placeholder="e.g. USD, BTC"
            />
          </div>
          <div className="row" />
          <div className="row">
            <InputField
              required={true}
              type="number"
              step={0.00000001}
              min={0}
              name="Trade Price"
              initialValue={this.state.tradePrice}
              handleChange={this.handleChange('tradePrice')}
              placeholder="Trade Price"
              rtl={false}
            />
          </div>
          <div className="row">
            <InputField
              type="date"
              initialValue={this.state.tradeDate}
              handleChange={this.handleChange('tradeDate')}
              name="Trade Date"
            />
          </div>

          <div className="row right">
            <ActionButton handleClick={this.handleCancel}>Cancel</ActionButton>
            <ActionButton
              handleClick={this.handleSave}
              raised={true}
              secondary={true}
            >
              Save
            </ActionButton>
          </div>
        </div>
      </Card>
    );
  }
}
