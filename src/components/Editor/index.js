import React, { Component } from 'react';
import './style.css';

// import { InputField } from '../material/InputField';

import { Modal, Select, Form, InputNumber } from 'antd';

import { COIN_PRICE, TRADING_PAIRS, callApi } from '../../utils';

const FormItem = Form.Item;

class _Editor extends Component {
  state = {
    toSymbols: [],
    position: null,
  };

  componentWillMount() {
    this.setState({ position: this.props.position });
  }

  async componentDidMount() {
    this.props.getCoins();
  }

  async componentWillUpdate(nextProps, nextState) {
    const { position } = this.state;
    const nextPosition = nextState.position;
    if (nextPosition.symbol !== position.symbol && nextPosition.symbol) {
      const response = await callApi(TRADING_PAIRS(nextPosition.symbol));
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
      const response = await callApi(
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
    const { coins } = this.props;
    const { position } = this.state;
    if (!position.symbol || !position.quantity) return;

    const newPosition = {
      ...position,
      coin: coins.find(c => c.Name === position.symbol),
    };

    if (newPosition.__id) {
      this.props.updatePosition(newPosition);
    } else {
      this.props.createPosition(newPosition);
    }

    this.props.closeEditor();
  };

  renderForm = () => {
    const { coins } = this.props;
    const {
      __id,
      symbol,
      // quantity,
      // currency,
      // tradeDate,
      // tradePrice,
    } = this.state.position;
    return (
      <form>
        <fieldset>
          <Select
            showSearch
            disabled={!!__id}
            placeholder="Select a coin"
            optionFilterProp="children"
            onChange={this.handleChange('symbol')}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            defaultValue={symbol || undefined}
          >
            {coins.map(coin => (
              <Select.Option key={coin.Name} value={coin.Name}>
                {coin.FullName}
              </Select.Option>
            ))}
          </Select>
        </fieldset>

        <fieldset>
          <InputNumber
            min={0}
            step={0.000001}
            onChange={this.handleChange('quantity')}
          />
        </fieldset>
        {/*<fieldset>*/}
        {/*<InputField*/}
        {/*required={true}*/}
        {/*type="number"*/}
        {/*step={0.00000001}*/}
        {/*min={0}*/}
        {/*initialValue={quantity}*/}
        {/*handleChange={this.handleChange('quantity')}*/}
        {/*name="Quantity"*/}
        {/*placeholder="e.g. 0.001"*/}
        {/*rtl={false}*/}
        {/*/>*/}
        {/*</fieldset>*/}
        {/*<fieldset>*/}
        {/*<datalist id="toSymbols">*/}
        {/*{this.state.toSymbols.map(toSymbol => (*/}
        {/*<option key={toSymbol} value={toSymbol}>*/}
        {/*{toSymbol}*/}
        {/*</option>*/}
        {/*))}*/}
        {/*</datalist>*/}
        {/*<InputField*/}
        {/*list="toSymbols"*/}
        {/*required={true}*/}
        {/*initialValue={currency}*/}
        {/*handleChange={this.handleChange('currency')}*/}
        {/*name="Currency"*/}
        {/*placeholder="e.g. USD, BTC"*/}
        {/*/>*/}
        {/*</fieldset>*/}
        {/*<fieldset>*/}
        {/*<InputField*/}
        {/*required={true}*/}
        {/*type="number"*/}
        {/*step={0.00000001}*/}
        {/*min={0}*/}
        {/*name="Trade Price"*/}
        {/*initialValue={tradePrice}*/}
        {/*handleChange={this.handleChange('tradePrice')}*/}
        {/*placeholder="Trade Price"*/}
        {/*rtl={false}*/}
        {/*/>*/}
        {/*</fieldset>*/}
        {/*<fieldset>*/}
        {/*<InputField*/}
        {/*type="date"*/}
        {/*initialValue={tradeDate}*/}
        {/*handleChange={this.handleChange('tradeDate')}*/}
        {/*name="Trade Date"*/}
        {/*/>*/}
        {/*</fieldset>*/}
      </form>
    );
  };

  renderForm2 = () => {
    const { coins } = this.props;
    const {
      __id,
      symbol,
      quantity,
      // currency,
      // tradeDate,
      // tradePrice,
    } = this.state.position;

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    return (
      <Form onSubmit={() => {}}>
        <FormItem {...formItemLayout} label={'Name'}>
          {getFieldDecorator('Name', {
            rules: [
              {
                required: true,
              },
            ],
            initialValue: symbol || undefined,
          })(
            <Select
              showSearch
              disabled={!!__id}
              placeholder="Select a coin"
              optionFilterProp="children"
              onChange={this.handleChange('symbol')}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              // defaultValue={symbol || undefined}
            >
              {coins.map(coin => (
                <Select.Option key={coin.Name} value={coin.Name}>
                  {coin.FullName}
                </Select.Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label={'Quantity'}>
          {getFieldDecorator('Quantity', {
            rules: [
              {
                required: true,
              },
            ],
            initialValue: quantity,
          })(
            <InputNumber
              min={0}
              step={0.000001}
              onChange={this.handleChange('quantity')}
            />
          )}
        </FormItem>
      </Form>
    );
  };

  render() {
    console.log('editor rendered');
    return (
      <Modal
        title={this.props.position.__id ? 'Edit' : 'Add new position'}
        visible={true}
        onOk={this.handleSave}
        okText="Save"
        onCancel={this.props.closeEditor}
      >
        {this.renderForm2()}
      </Modal>
    );
  }
}

export const Editor = Form.create()(_Editor);
