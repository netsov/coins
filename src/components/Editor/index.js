import React, { Component } from 'react';
import './style.css';

import { Modal, Select, Form, InputNumber } from 'antd';
import { fetchTickerAll } from '../../utils/coinmarketcap';

const FormItem = Form.Item;

class _Editor extends Component {
  state = {
    toSymbols: [],
    position: null,
    isNew: true,
  };

  componentWillMount() {
    this.setState({
      position: this.props.position,
      isNew: !this.props.position.__id,
    });
  }

  // async componentDidMount() {
  //   this.setState({ ticker: await fetchTickerAll() });
  // }

  handleChange = field => value => {
    this.setState({ position: { ...this.state.position, [field]: value } });
  };

  handleSave = () => {
    const { ticker } = this.props;
    const { position } = this.state;
    if (!(position.__id && position.quantity)) return;
    const __meta = ticker.find(i => i.id === position.__id) || {};

    this.props.updatePosition({ ...position, __meta });
    // this.props.getTickerData();
  };

  renderForm = () => {
    const { ticker } = this.props;
    const { isNew } = this.state;
    const { __id, quantity } = this.state.position;

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    const __meta = ticker.find(i => i.id === __id) || {};

    return (
      <Form onSubmit={() => {}}>
        <FormItem {...formItemLayout} label={'Name'}>
          {getFieldDecorator('Name', {
            rules: [
              {
                required: true,
              },
            ],
            initialValue: __meta.symbol,
          })(
            <Select
              showSearch
              disabled={!isNew}
              placeholder="Select a coin"
              optionFilterProp="children"
              onChange={this.handleChange('__id')}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              // defaultValue={symbol || undefined}
            >
              {ticker.map(coin => (
                <Select.Option key={coin.id} value={coin.id}>
                  {`${coin.name} (${coin.symbol})`}
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
        {this.renderForm()}
      </Modal>
    );
  }
}

export const Editor = Form.create()(_Editor);
