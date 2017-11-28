import React, { Component } from 'react';
import './style.css';

import ActionButton from '../ActionButton';
import InputField from '../InputField';
import Card from '../Card';

import { symbolsMock } from '../../mocks';

const SYMBOLS = 'https://min-api.cryptocompare.com/data/all/coinlist';
const TRADING_PAIRS = fsym =>
  `https://min-api.cryptocompare.com/data/top/pairs?fsym=${fsym}&limit=100`;
const PRICE = (fsym, tsym) =>
  `https://min-api.cryptocompare.com/data/price?fsym=${fsym}&tsyms=${tsym}`;

class Editor extends Component {
  state = {
    symbols: [],
    toSymbols: [],
    symbol: '',
    tradePrice: '',
    tradeDate: '',
    currency: '',
    quantity: '',
  };

  async componentDidMount() {
    // const response = await (await fetch(SYMBOLS)).json();
    // console.log();
    const symbols = Object.values(symbolsMock.Data).sort(
      (a, b) => parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10)
    );

    // console.log(symbolsMock.Data.BTC);

    this.setState({ symbols });
  }

  async componentWillUpdate(nextProps, nextState) {
    if (nextState.symbol !== this.state.symbol && nextState.symbol) {
      const response = await (await fetch(
        TRADING_PAIRS(nextState.symbol)
      )).json();
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
      const response = await (await fetch(
        PRICE(nextState.symbol, nextState.currency)
      )).json();
      const tradePrice = response[nextState.currency];
      if (tradePrice)
        this.setState({
          tradePrice,
        });
    }
  }

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  handleCancel = () => {};

  handleSave = () => {
    const storage = window.localStorage;

    let positions = storage.getItem('positions');
    positions = positions ? JSON.parse(positions) : [];

    const { symbol, tradeDate, tradePrice, currency, quantity } = this.state;

    const newPosition = {
      __id: new Date().valueOf(),
      symbol,
      tradePrice,
      tradeDate,
      currency,
      quantity,
    };

    storage.setItem('positions', JSON.stringify([newPosition, ...positions]));
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
            <datalist id="symbols">
              {this.state.symbols.map(coin => (
                <option key={coin.Name} value={coin.Name}>
                  {coin.FullName}
                </option>
              ))}
            </datalist>
            <InputField
              list="symbols"
              required={true}
              name="Symbol"
              value={this.state.symbol}
              onChange={this.handleChange('symbol')}
              placeholder="e.g. BTC, ETH, LTC"
            />
          </div>
          <div className="row">
            <InputField
              required={true}
              type="number"
              step={0.00000001}
              min={0}
              value={this.state.quantity}
              onChange={this.handleChange('quantity')}
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
              value={this.state.currency}
              onChange={this.handleChange('currency')}
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
              value={this.state.tradePrice}
              onChange={this.handleChange('tradePrice')}
              placeholder="Trade Price"
              rtl={false}
            />
          </div>
          <div className="row">
            <InputField
              type="date"
              value={this.state.tradeDate}
              onChange={this.handleChange('tradeDate')}
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

export default Editor;
