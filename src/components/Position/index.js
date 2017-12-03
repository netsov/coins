import React, { Component, Fragment } from 'react';
import './style.css';

import { ActionButton } from '../ActionButton';
import { Elevation } from '../Elevation';

import ReactHighstock from 'react-highcharts/ReactHighstock.src';

import { getFromCache, HYSTO_DAY, HYSTO_HOUR, PRICE } from '../../utils';

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

const colors = {
  // btc: '#8884d8',
  btc: '#f7921a',
  // usd: '#82ca9d',
  usd: '#009833',
};

export class Position extends Component {
  state = {
    data: null,
    priceResponse: {},
  };

  shouldComponentUpdate(nextProps, nextState) {
    const positionChanged = Object.entries(nextProps.position)
      .map(([key, value]) => value !== this.props.position[key])
      .some(Boolean);
    const dataChanged =
      !this.state.data || this.state.data.zoom !== nextState.data.zoom;
    return positionChanged || dataChanged;
  }

  async componentDidMount() {
    await this.fetchPrice();
    await this.fetchData();
  }

  async fetchPrice() {
    const priceResponse = await getFromCache(
      PRICE(this.props.position.symbol, 'USD,BTC')
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

  renderChart = () => {
    const { data } = this.state;
    if (!data) return;

    const { symbol, zoom } = this.props.position;

    const series = [
      {
        yAxis: 0,
        name: 'Price (USD)',
        color: colors.usd,
        data: data.usd,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ];

    const yAxis = [
      {
        labels: {
          format: '${value}',
          style: {
            color: colors.usd,
          },
        },
        title: {
          text: 'Price (USD)',
          style: {
            color: colors.usd,
          },
        },
        opposite: true,
        offset: 30,
      },
    ];

    if (data.btc) {
      series.push({
        yAxis: 1,
        name: 'Price (BTC)',
        data: data.btc,
        color: colors.btc,
        tooltip: {
          valueDecimals: 6,
        },
      });

      yAxis.push({
        labels: {
          format: '{value}BTC',
          style: {
            color: colors.btc,
          },
        },
        title: {
          text: 'Price (BTC)',
          style: {
            color: colors.btc,
          },
        },
        opposite: true,
      });
    }

    const rangeSelector = {
      allButtonsEnabled: true,
      inputEnabled: false,
      buttons: [
        {
          type: 'day',
          count: 1,
          text: '1d',
        },
        {
          type: 'day',
          count: 7,
          text: '7d',
        },
        {
          type: 'month',
          count: 1,
          text: '1m',
        },
        {
          type: 'month',
          count: 3,
          text: '3m',
        },
        {
          type: 'year',
          count: 1,
          text: '1y',
        },
      ],
    };

    rangeSelector.buttons = rangeSelector.buttons.map(b => ({
      ...b,
      events: {
        click: this.handleZoom(b.text),
      },
    }));

    rangeSelector.selected = rangeSelector.buttons.findIndex(
      b => b.text === zoom
    );

    let subtitle = `<span>$${this.state.priceResponse.USD}</span>`;
    if (symbol !== 'BTC')
      subtitle += `<br/><span>${this.state.priceResponse.BTC} BTC</span>`;

    const config = {
      rangeSelector,
      title: {
        // align: 'left',
        text: symbol,
        style: { fontSize: '22px' },
      },
      subtitle: {
        // align: 'left',
        text: subtitle,
        style: { fontSize: '16px' },
      },
      series,
      yAxis,
    };

    return <ReactHighstock config={config} />;
  };

  handleDelete = () => this.props.deletePosition(this.props.position.__id);

  handleZoom = zoom => () => {
    // https://github.com/highcharts/highcharts/issues/2775
    setTimeout(
      () => this.props.savePosition({ ...this.props.position, zoom }),
      1
    );
    return false;
  };

  render() {
    const { position } = this.props;
    console.log(position.symbol, 'rendered');
    return (
      <Fragment>
        <Elevation ripple={false}>{this.renderChart()}</Elevation>
      </Fragment>
    );
  }
}
