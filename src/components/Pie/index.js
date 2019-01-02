import React, { Component } from 'react';

import './style.css';
import isEqual from 'lodash.isequal';
import ReactHighcharts from 'react-highcharts/ReactHighcharts.src';
import { trackGA } from '../../utils';

export class Pie extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const propsKeys = ['positions'];
    const stateKeys = [];

    return (
      stateKeys.some(key => !isEqual(this.state[key], nextState[key])) ||
      propsKeys.some(key => !isEqual(this.props[key], nextProps[key]))
    );
  }

  componentDidMount() {
    trackGA('pie');
  }

  render() {
    const tsym = 'usd';
    const { positions, tickerById } = this.props;

    if (positions.length === 0) return <p>No data</p>;

    const tooltipFormatter = {
      usd: '${point.y:.1f}', // eslint-disable-line no-template-curly-in-string
      btc: '{point.y:.6f} BTC',
    };
    const config = {
      colors: [
        '#f45b5b',
        '#8085e9',
        '#8d4654',
        '#7798BF',
        '#aaeeee',
        '#ff0066',
        '#55BF3B',
        '#7cb5ec',
        '#f7a35c',
        '#2b908f',
        '#90ee7e',
        '#eeaaee',
        '#DF5353',
      ],
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'My portfolio',
      },
      tooltip: {
        pointFormat: `{series.name}: <b>${tooltipFormatter[tsym]}</b>`,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: 'Holdings',
          colorByPoint: true,
          data: positions.map(item => {
            const __meta = tickerById[item.__id];
            if (!__meta) return null;
            return {
              name: `${__meta.name} (${__meta.symbol})`,
              y: item.quantity * parseFloat(__meta[`price_${tsym}`]),
            };
          }),
        },
      ],
    };
    console.log('Pie rendered');

    return (
      <div className="pie-container">
        <ReactHighcharts config={config} ref="chart" />
      </div>
    );
  }
}
