import React, { Component } from 'react';
import './style.css';
// import classNames from 'classnames';
import isEqual from 'lodash.isequal';
import { Chart } from '../Chart';

import { getHystoData } from '../../utils/index';

// const CACHE_AGE = 1000 * 60 * 5;

export class Position extends Component {
  state = {
    data: null,
    loading: false,
  };

  interval = 1000 * 60 * 5;
  intervalID = null;

  shouldComponentUpdate(nextProps, nextState) {
    const propsKeys = ['position', 'showChart', 'selected', 'prices'];
    const stateKeys = ['loading'];

    return (
      stateKeys.some(key => !isEqual(this.state[key], nextState[key])) ||
      propsKeys.some(key => !isEqual(this.props[key], nextProps[key]))
    );
  }

  async componentDidMount() {
    // await this.fetchPrice();
    // await this.fetchData();
    // this.updateCache(true);
  }

  componentWillUnmount() {
    this.intervalID && clearInterval(this.intervalID);
  }

  updateCache = (init = false) => {
    if (init) this.intervalID = setInterval(this.updateCache, this.interval);
  };

  // async fetchPrice() {
  //   const prices = await getFromCache(
  //     COIN_PRICE(this.props.position.symbol, 'USD,BTC')
  //   );
  //   this.props.updatePosition({ ...this.props.position, prices });
  // }

  async fetchData() {
    const { position, showChart } = this.props;
    if (!showChart) return;
    // const zoomMeta = ZOOM_INDEX[position.zoom];
    // if (!zoomMeta) return;

    this.setState({ loading: true });

    // const responseUSD = await getFromCache(
    //   zoomMeta.url(position.symbol, 'USD', zoomMeta.limit)
    // );
    //
    // const data = { zoom: position.zoom };
    //
    // data.usd = responseUSD.Data.map(item => [item.time * 1000, item.close]);
    // if (position.symbol !== 'BTC') {
    //   const responseBTC = await getFromCache(
    //     zoomMeta.url(position.symbol, 'BTC', zoomMeta.limit)
    //   );
    //   data.btc = responseBTC.Data.map(item => [item.time * 1000, item.close]);
    // }

    const data = {
      usd: await getHystoData(position.zoom, position.symbol),
    };

    if (position.symbol !== 'BTC')
      data.btc = await getHystoData(position.zoom, position.symbol, 'BTC');

    this.setState({ data, loading: false });
  }

  // async componentDidUpdate(prevProps) {
  //   if (prevProps.position.zoom !== this.props.position.zoom)
  //
  // }

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
