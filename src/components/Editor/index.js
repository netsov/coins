import React, { Component, Fragment } from 'react';
import './style.css';

import { ActionButton } from '../material/ActionButton';
import { InputField } from '../material/InputField';
import { Dialog } from '../material/Dialog';

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
    position: null,
  };

  componentWillMount() {
    this.setState({ position: this.props.position });
  }

  async componentDidMount() {
    const response = await getFromCache(COIN_LIST);
    const coinList = Object.values(response.Data).sort(
      (a, b) => parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10)
    );

    this.setState({ coinList });
  }

  async componentWillUpdate(nextProps, nextState) {
    const { position } = this.state;
    const nextPosition = nextState.position;
    if (nextPosition.symbol !== position.symbol && nextPosition.symbol) {
      const response = await getFromCache(TRADING_PAIRS(nextPosition.symbol));
      const toSymbols = response.Data.map(pair => pair.toSymbol);
      this.setState({
        position: {
          ...nextPosition,
          currency: '',
          toSymbols: toSymbols,
        },
      });
    }

    if (
      nextPosition.currency !== position.currency &&
      nextPosition.currency &&
      this.state.toSymbols.indexOf(nextPosition.currency) !== -1
    ) {
      const response = await getFromCache(
        COIN_PRICE(nextPosition.symbol, nextPosition.currency)
      );
      const tradePrice = response[nextPosition.currency];
      if (tradePrice)
        this.setState({
          position: { ...nextPosition, tradePrice },
        });
    }
  }

  handleChange = field => value => {
    this.setState({ position: { ...this.state.position, [field]: value } });
  };

  handleSave = () => {
    const { position, coinList } = this.state;
    if (!position.symbol || !position.quantity) return;

    const newPosition = {
      ...position,
      coin: coinList.find(c => c.Name === position.symbol),
    };

    if (newPosition.__id) {
      this.props.updatePosition(newPosition);
    } else {
      this.props.createPosition(newPosition);
    }

    this.props.closeEditor();
  };

  renderForm = () => {
    const {
      __id,
      symbol,
      quantity,
      currency,
      tradeDate,
      tradePrice,
    } = this.state.position;
    return (
      <form>
        <fieldset>
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
            initialValue={symbol}
            handleChange={this.handleChange('symbol')}
            placeholder="e.g. BTC, ETH, LTC"
            disabled={!!__id}
          />
        </fieldset>
        <fieldset>
          <InputField
            required={true}
            type="number"
            step={0.00000001}
            min={0}
            initialValue={quantity}
            handleChange={this.handleChange('quantity')}
            name="Quantity"
            placeholder="e.g. 0.001"
            rtl={false}
          />
        </fieldset>
        <fieldset>
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
            initialValue={currency}
            handleChange={this.handleChange('currency')}
            name="Currency"
            placeholder="e.g. USD, BTC"
          />
        </fieldset>
        <fieldset>
          <InputField
            required={true}
            type="number"
            step={0.00000001}
            min={0}
            name="Trade Price"
            initialValue={tradePrice}
            handleChange={this.handleChange('tradePrice')}
            placeholder="Trade Price"
            rtl={false}
          />
        </fieldset>
        <fieldset>
          <InputField
            type="date"
            initialValue={tradeDate}
            handleChange={this.handleChange('tradeDate')}
            name="Trade Date"
          />
        </fieldset>
      </form>
    );
  };

  renderButtons = () => (
    <Fragment>
      <ActionButton handleClick={this.props.closeEditor}>Cancel</ActionButton>
      <ActionButton
        handleClick={this.handleSave}
        raised={true}
        secondary={true}
      >
        Save
      </ActionButton>
    </Fragment>
  );

  render() {
    console.log('editor rendered');
    return (
      <Dialog
        open={true}
        header={this.props.position.__id ? 'Edit' : 'Add new position'}
        buttons={this.renderButtons()}
      >
        {this.renderForm()}
      </Dialog>
    );
  }
}
