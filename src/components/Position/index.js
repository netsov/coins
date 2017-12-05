import React, { Component, Fragment } from 'react';
import './style.css';

// import { ActionButton } from '../ActionButton';
import { Elevation } from '../material/Elevation';
import { Progress } from '../material/Progress';
import { Chart } from '../Chart';
import { Checked, Unchecked } from '../material/Icons';

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

export class Position extends Component {
  state = {
    data: null,
    priceResponse: {},
    hovered: false,
  };

  onHoverChange = hovered => this.setState({ hovered });

  shouldComponentUpdate(nextProps, nextState) {
    const positionChanged = Object.entries(nextProps.position)
      .map(
        ([key, value]) => key !== 'coin' && value !== this.props.position[key]
      )
      .some(Boolean);
    const dataChanged =
      !this.state.data || this.state.data.zoom !== nextState.data.zoom;
    const hoverChanged = this.state.hovered !== nextState.hovered;
    return hoverChanged || positionChanged || dataChanged;
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

    this.setState({ data });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.position.zoom !== this.props.position.zoom)
      await this.fetchData();
  }

  handleDelete = () => this.props.deletePosition(this.props.position.__id);

  handleZoom = zoom => () => {
    // https://github.com/highcharts/highcharts/issues/2775
    setTimeout(
      () => this.props.savePosition({ ...this.props.position, zoom }),
      1
    );
    return false;
  };

  renderHeader = () => {
    const { symbol, coin } = this.props.position;
    const { hovered } = this.state;

    return (
      <section>
        <div className="symbol-container">
          <img
            src={COIN_IMG_URL(coin.ImageUrl)}
            height="32"
            width="32"
            alt=""
          />
          <span>{coin.FullName}</span>
        </div>
        <div className="prices-container">
          <span>${this.state.priceResponse.USD}</span>
          {symbol === 'BTC' ? null : (
            <span>{this.state.priceResponse.BTC} BTC</span>
          )}
        </div>
        {hovered && (
          <span className="select-icon">
            <Checked />
          </span>
        )}
      </section>
    );
  };

  render() {
    const { zoom, symbol } = this.props.position;
    const { data } = this.state;
    console.log(symbol, 'rendered');
    return (
      <Fragment>
        <Elevation ripple={false} onHoverChange={this.onHoverChange}>
          <Progress show={false} />
          {this.renderHeader()}
          <Chart zoom={zoom} data={data} handleZoom={this.handleZoom} />
        </Elevation>
      </Fragment>
    );
  }
}
