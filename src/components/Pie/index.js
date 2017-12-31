import React, { Component } from 'react';

import './style.css';

// import isEqual from 'lodash.isequal';
import ReactHighcharts from 'react-highcharts/ReactHighcharts.src';
import { calcTotal, getCoinPrice } from '../../utils';

import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export class Pie extends Component {
  state = {
    tsym: 'USD',
  };

  componentDidMount() {
    this.props.getPositions();
  }

  render() {
    const { tsym } = this.state;
    const { positions, prices } = this.props;

    if (positions.length === 0) return null;

    const tooltipFormatter = {
      USD: '${point.y:.1f}',
      BTC: '{point.y:.6f} BTC',
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
            name: p.coin.FullName,
            y: calcTotal(p.quantity, getCoinPrice(p.symbol, tsym, prices)),
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
          <Radio value={'USD'}>USD</Radio>
          <Radio value={'BTC'}>BTC</Radio>
        </RadioGroup>
        <ReactHighcharts config={config} ref="chart" />
      </div>
    );
  }
}
