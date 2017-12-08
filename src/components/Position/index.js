import React, { Component, Fragment } from 'react';
import './style.css';

// import { ActionButton } from '../ActionButton';
import { Elevation } from '../material/Elevation';
import { Progress } from '../material/Progress';
import { Chart } from '../Chart';

import {
  getFromCache,
  HYSTO_DAY,
  HYSTO_HOUR,
  COIN_PRICE,
  COIN_IMG_URL,
} from '../../utils';

const ZOOM = [
  {
    name: '1d',
    url: HYSTO_HOUR,
    format: 'HH:mm',
    limit: 24,
  },
  {
    name: '7d',
    url: HYSTO_HOUR,
    format: 'MMM D',
    limit: 7 * 24,
  },
  {
    name: '1m',
    url: HYSTO_DAY,
    format: 'MMM D',
    limit: 30,
  },
  {
    name: '3m',
    url: HYSTO_DAY,
    format: 'MMM D',
    limit: 90,
  },
  {
    name: '1y',
    url: HYSTO_DAY,
    format: 'MMM D',
    limit: 365,
  },
];

const ZOOM_INDEX = ZOOM.reduce(
  (prev, next) => ({ ...prev, [next.name]: next }),
  {}
);

function stringPropertiesCompare(obj1, obj2) {
  return Object.entries(obj2)
    .map(([key, value]) => typeof key === 'string' && value === obj1[key])
    .every(Boolean);
}

const Separator = () => <div className="separator" />;

export class Position extends Component {
  state = {
    data: null,
    priceResponse: {},
    loading: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const positionChanged = !stringPropertiesCompare(
      this.props.position,
      nextProps.position
    );
    const dataChanged =
      !this.state.data || this.state.data.zoom !== nextState.data.zoom;
    const selectedChanged = this.props.selected !== nextProps.selected;
    const loadingChanged = this.state.loading !== nextState.loading;
    return loadingChanged || selectedChanged || positionChanged || dataChanged;
  }

  async componentDidMount() {
    await this.fetchPrice();
    await this.fetchData();
  }

  async fetchPrice() {
    const priceResponse = await getFromCache(
      COIN_PRICE(this.props.position.symbol, 'USD,BTC')
    );
    this.setState({
      priceResponse,
    });
  }

  async fetchData() {
    const { position } = this.props;
    const zoomMeta = ZOOM_INDEX[position.zoom];
    if (!zoomMeta) return;

    this.setState({ loading: true });

    const responseUSD = await getFromCache(
      zoomMeta.url(position.symbol, 'USD', zoomMeta.limit)
    );

    const data = { zoom: position.zoom };

    data.usd = responseUSD.Data.map(item => [item.time * 1000, item.close]);
    if (position.symbol !== 'BTC') {
      const responseBTC = await getFromCache(
        zoomMeta.url(position.symbol, 'BTC', zoomMeta.limit)
      );
      data.btc = responseBTC.Data.map(item => [item.time * 1000, item.close]);
    }

    this.setState({ data, loading: false });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.position.zoom !== this.props.position.zoom)
      await this.fetchData();
  }

  handleZoom = zoom => () => {
    // https://github.com/highcharts/highcharts/issues/2775
    setTimeout(
      () => this.props.savePosition({ ...this.props.position, zoom }),
      1
    );
    return false;
  };

  renderHeader = () => {
    const { position } = this.props;
    const { coin, quantity, symbol } = position;
    const { USD, BTC } = this.state.priceResponse;

    return (
      <section>
        <div className="symbol-container">
          <img src={COIN_IMG_URL(coin.ImageUrl)} height="32" width="32" />
          &nbsp;
          <span className="coin-name">{coin.FullName}</span>
          &nbsp; &nbsp;
          <div className="prices-container">
            <span className="usd-price">${USD}</span>
            {symbol !== 'BTC' ? (
              <Fragment>
                <Separator />
                <span className="btc-price">${BTC}</span>
              </Fragment>
            ) : null}
          </div>
        </div>
        <div className="holdings-container">
          <span>
            {quantity}&nbsp;
            {symbol}
          </span>
          <Separator />
          <span>${quantity * USD}</span>
          {symbol !== 'BTC' ? (
            <Fragment>
              <Separator />
              <span>{(quantity * BTC).toFixed(8)}&nbsp;BTC</span>
            </Fragment>
          ) : null}
        </div>
      </section>
    );
  };

  render() {
    const {
      position: { zoom, symbol, __id },
      selected,
      toggleSelected,
    } = this.props;
    const { data, loading } = this.state;
    console.log(symbol, 'rendered');
    return (
      <Fragment>
        <Elevation
          checked={selected.find(positionId => positionId === __id)}
          toggleSelected={() => toggleSelected(__id)}
          unchecked={selected.length > 0}
        >
          <Progress show={loading} />
          {this.renderHeader()}
          <Chart zoom={zoom} data={data} handleZoom={this.handleZoom} />
        </Elevation>
      </Fragment>
    );
  }
}
