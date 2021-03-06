import React, { Component } from 'react';

import isEqual from 'lodash.isequal';

const colors = {
  // btc: '#8884d8',
  btc: '#f7921a',
  // usd: '#82ca9d',
  usd: '#009833',
};

const buttons = [
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
];

export class Chart extends Component {
  state = {
    Highstock: null,
  };

  componentWillMount() {
    import(/* webpackChunkName: "highstock" */ '../highstock').then(module => {
      this.setState({ Highstock: module.default });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const propsKeys = ['zoom', 'usd', 'btc', 'expanded'];
    const stateKeys = ['Highstock'];

    return (
      stateKeys.some(key => !isEqual(this.state[key], nextState[key])) ||
      propsKeys.some(key => !isEqual(this.props[key], nextProps[key]))
    );
  }

  componentDidMount() {
    this.getData(this.props.item.zoom);
    this.handleLoading(this.props.item);
  }

  showLoading = () =>
    this.refs.chart && this.refs.chart.getChart().showLoading();

  hideLoading = () =>
    this.refs.chart && this.refs.chart.getChart().hideLoading();

  handleLoading = item =>
    (item.loading ? this.showLoading : this.hideLoading)();

  getData(zoom, force) {
    const { item: { __id }, usd, btc, __meta: { symbol } } = this.props;
    if (!symbol) return;
    if (!(usd.length || btc.length)) this.showLoading();
    this.props.getHisto(symbol, 'USD', zoom, __id, force);
    if (symbol !== 'BTC') this.props.getHisto(symbol, 'BTC', zoom, __id, force);
  }

  componentWillReceiveProps(nextProps) {
    this.handleLoading(nextProps.item);

    if (!this.props.expanded && nextProps.expanded) {
      this.getData(nextProps.item.zoom);
    }
  }

  handleZoom = zoom => () => {
    // https://github.com/highcharts/highcharts/issues/2775
    setTimeout(async () => {
      this.props.updateItem({ ...this.props.item, zoom });
      this.getData(zoom);
      // await this.fetchData();
    }, 1);
  };

  render() {
    const { usd, btc, zoom } = this.props;
    const { Highstock } = this.state;
    // if (!(usd || btc)) return null;

    const ts = list => list.map(([time, price]) => [time * 1000, price]);

    const series = [
      {
        yAxis: 0,
        name: 'Price (USD)',
        color: colors.usd,
        data: ts(usd),
        tooltip: {
          valueDecimals: 2,
        },
      },
    ];

    const yAxis = [
      {
        labels: {
          format: '${value}', // eslint-disable-line no-template-curly-in-string
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
        offset: 50,
      },
    ];

    if (btc && btc.length) {
      series.push({
        yAxis: 1,
        name: 'Price (BTC)',
        data: ts(btc),
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
      buttons: buttons.map(b => ({
        ...b,
        events: {
          click: this.handleZoom(b.text),
        },
      })),
      selected: buttons.findIndex(b => b.text === zoom),
    };

    const exporting = {
      buttons: {
        customButton: {
          text: 'Reload',
          onclick: () => this.getData(zoom, true),
        },
        contextButton: {
          enabled: false,
        },
      },
    };

    const config = {
      rangeSelector,
      series,
      yAxis,
      chart: {
        zoomType: 'x',
      },
      tooltip: {
        shared: true,
        split: false,
      },
      exporting,
    };

    console.log('Chart rendered', this.props.item.__id);

    return Highstock ? (
      <Highstock config={config} ref="chart" />
    ) : (
      <p>Loading...</p>
    );
  }
}
