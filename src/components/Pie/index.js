import React, { Component } from 'react';

import './style.css';

// import isEqual from 'lodash.isequal';
import ReactHighcharts from 'react-highcharts/ReactHighcharts.src';
import { calcTotal, getCoinPrice } from '../../utils';

import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export class Pie extends Component {
  state = {
    tsym: 'usd',
  };

  componentDidMount() {
    this.props.getPositions();
  }

  render() {
    const { tsym } = this.state;
    const { positions } = this.props;

    if (positions.length === 0) return null;

    const tooltipFormatter = {
      usd: '${point.y:.1f}',
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
          name: 'Assets',
          colorByPoint: true,
          data: positions.map(p => ({
            name: `${p.__meta.name} (${p.__meta.symbol})`,
            y: p.quantity * parseFloat(p.__meta[`price_${tsym}`]),
          })),
        },
      ],
    };
    console.log('Pie rendered');

    return (
      <div className="pie-container">
        <RadioGroup
          onChange={e => this.setState({ tsym: e.target.value })}
          value={tsym}
        >
          <Radio value={'usd'}>USD</Radio>
          <Radio value={'btc'}>BTC</Radio>
        </RadioGroup>
        <ReactHighcharts config={config} ref="chart" />
      </div>
    );
  }
}
