import React, { Component, Fragment } from 'react';
import './style.css';
import classNames from 'classnames';
import isEqual from 'lodash.isequal';
import { Elevation } from '../material/Elevation';
import { Progress } from '../material/Progress';
import { Checkbox } from '../material/Checkbox';
import { Chart } from '../Chart';

import {
  // ZOOM_CHOICES_INDEX,
  COIN_IMG_URL,
  getCoinPrice,
  formatFloat,
  getCoinChange,
} from '../../utils';
import { getHystoData } from '../../utils/index';

// const CACHE_AGE = 1000 * 60 * 5;

const Separator = () => <div className="separator" />;

const change = (symbol, tsym, prices) => {
  const change = getCoinChange(symbol, tsym, prices);
  if (!change) return null;
  return (
    <small
      className={classNames('change--positive', {
        'change--negative': change < 0,
      })}
    >
      <data>
        {change > 0 ? '+' : '-'}
        {Math.abs(change)}%
      </data>
    </small>
  );
};

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

  renderHeader = () => {
    const {
      position: { coin, quantity, symbol, __id },
      selected,
      toggleSelected,
    } = this.props;

    const { prices } = this.props;

    if (!prices) return null;

    // const { USD: { PRICE: USD }, BTC: { PRICE: BTC } } = prices;

    const USD = getCoinPrice(symbol, 'USD', prices);
    const BTC = getCoinPrice(symbol, 'BTC', prices);

    return (
      <section className="position-header">
        <Checkbox
          checked={selected.find(positionId => positionId === __id)}
          onToggle={() => toggleSelected(__id)}
        />

        <div style={{ flex: 1 }}>
          <img
            className="coin-logo"
            src={COIN_IMG_URL(coin.ImageUrl)}
            height="32"
            width="32"
          />
        </div>

        <div style={{ flex: 2 }}>
          <span className="">{coin.FullName}</span>
        </div>

        <div style={{ flex: 2 }}>
          <span className="usd-price">
            ${formatFloat(USD)}&nbsp;{change(symbol, 'USD', prices)}
          </span>
        </div>

        <div style={{ flex: 2 }}>
          <span className="btc-price">
            ₿{formatFloat(BTC)}&nbsp;{change(symbol, 'BTC', prices)}
          </span>
        </div>

        <div style={{ flex: 2 }}>
          <span>
            {quantity}&nbsp;
            {symbol}
          </span>
        </div>

        <div style={{ flex: 2 }}>
          <span>${formatFloat(quantity * USD)}</span>
        </div>

        <div style={{ flex: 2 }}>
          <span>{formatFloat(quantity * BTC)}&nbsp;BTC</span>
        </div>
      </section>
    );

    return (
      <section className="position-header">
        <Checkbox
          checked={selected.find(positionId => positionId === __id)}
          onToggle={() => toggleSelected(__id)}
        />
        <div className="symbol-container">
          <img
            className="coin-logo"
            src={COIN_IMG_URL(coin.ImageUrl)}
            height="32"
            width="32"
          />
          &nbsp;
          <span className="coin-name">{coin.FullName}</span>
          &nbsp; &nbsp;
          <div className="prices-container">
            <span className="usd-price">
              ${formatFloat(USD)}&nbsp;{change(symbol, 'USD', prices)}
            </span>
            <Fragment>
              <Separator />
              <span className="btc-price">
                ₿{formatFloat(BTC)}&nbsp;{change(symbol, 'BTC', prices)}
              </span>
            </Fragment>
          </div>
        </div>
        <div className="holdings-container">
          <span>
            {quantity}&nbsp;
            {symbol}
          </span>
          <Separator />
          <span>${formatFloat(quantity * USD)}</span>
          <Fragment>
            <Separator />
            <span>{formatFloat(quantity * BTC)}&nbsp;BTC</span>
          </Fragment>
        </div>
      </section>
    );
  };

  render() {
    const {
      position: { zoom, symbol, __id },
      selected,
      showChart,
    } = this.props;
    const { data, loading } = this.state;
    console.log(symbol, 'rendered');
    return (
      <Fragment>
        <Elevation
          // hoverClass="hovered-position"
          checked={selected.find(positionId => positionId === __id)}
        >
          <Progress show={loading} />
          {this.renderHeader()}
          {showChart && (
            <Chart zoom={zoom} data={data} handleZoom={this.handleZoom} />
          )}
        </Elevation>
      </Fragment>
    );
  }
}
