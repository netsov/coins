import React, { Component } from 'react';

import isEqual from 'lodash.isequal';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

const colors = {
  // btc: '#8884d8',
  btc: '#f7921a',
  // usd: '#82ca9d',
  usd: '#009833',
};

export class Chart extends Component {
  shouldComponentUpdate(nextProps) {
    // console.log('>>>', nextProps);
    const propsKeys = ['data', 'zoom'];
    return propsKeys.some(key => !isEqual(this.props[key], nextProps[key]));
  }

  render() {
    const { data, zoom, handleZoom } = this.props;
    if (!data) return null;

    const ts = list => list.map(([time, price]) => [time * 1000, price]);

    const series = [
      {
        yAxis: 0,
        name: 'Price (USD)',
        color: colors.usd,
        data: ts(data.usd),
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

    if (data.btc) {
      series.push({
        yAxis: 1,
        name: 'Price (BTC)',
        data: ts(data.btc),
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
        click: handleZoom(b.text),
      },
    }));

    rangeSelector.selected = rangeSelector.buttons.findIndex(
      b => b.text === zoom
    );

    const config = {
      rangeSelector,

      series,
      yAxis,
    };

    console.log('chart rendered');

    return <ReactHighstock config={config} />;
  }
}
