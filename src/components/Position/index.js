import React, { Component } from 'react';
import './style.css';
import isEqual from 'lodash.isequal';
import { Chart } from '../Chart';

import { getHystoData } from '../../utils';
import { intervalMixin } from '../../utils/mixins';

export class Position extends intervalMixin(Component) {
  state = {
    data: null,
    loading: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const propsKeys = ['position', 'showChart', 'selected', 'prices'];
    const stateKeys = ['loading'];

    return (
      stateKeys.some(key => !isEqual(this.state[key], nextState[key])) ||
      propsKeys.some(key => !isEqual(this.props[key], nextProps[key]))
    );
  }

  async componentDidMount() {
    await this.fetchData();
    // this.updateCache(true);
  }

  updateCache = (init = false) => {
    if (init) this.intervalID = setInterval(this.updateCache, this.interval);
  };

  async fetchData() {
    const { position } = this.props;

    this.setState({ loading: true });

    const data = {
      usd: await getHystoData(position.zoom, position.symbol),
    };

    if (position.symbol !== 'BTC')
      data.btc = await getHystoData(position.zoom, position.symbol, 'BTC');

    this.setState({ data, loading: false });
  }

  handleZoom = zoom => () => {
    // https://github.com/highcharts/highcharts/issues/2775
    setTimeout(async () => {
      this.props.updatePosition({ ...this.props.position, zoom });
      await this.fetchData();
    }, 1);
    // return false;
  };

  render() {
    const {
      position: { zoom, symbol },
      // selected,
      // showChart,
    } = this.props;
    const {
      data,
      // loading
    } = this.state;
    console.log(symbol, 'rendered');

    return <Chart zoom={zoom} data={data} handleZoom={this.handleZoom} />;
  }
}
