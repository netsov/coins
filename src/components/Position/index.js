import React, { Component, Fragment } from 'react';
import './style.css';

import { ActionButton } from '../ActionButton';
import { Elevation } from '../Elevation';

import ReactHighstock from 'react-highcharts/ReactHighstock.src';
// import Highlight from 'react-highlight';

import { getFromCache } from '../../utils';

const HYSTO_HOUR = (fsym, tsym, limit) =>
  `https://min-api.cryptocompare.com/data/histohour?fsym=${fsym}&tsym=${
    tsym
  }&limit=${limit}`;

const HYSTO_DAY = (fsym, tsym, limit) =>
  `https://min-api.cryptocompare.com/data/histoday?fsym=${fsym}&tsym=${tsym}&${
    limit ? `limit=${limit}` : 'allData=true'
  }`;

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
    limit: 360,
  },
  // {
  //   name: 'all',
  //   url: HYSTO_DAY,
  //   format: 'MMM D',
  // },
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
    await this.fetchData();
  }

  async fetchData() {
    const { position } = this.props;
    const zoomMeta = ZOOM_INDEX[position.zoom];
    if (!zoomMeta) return;

    const responseUSD = await getFromCache(
      zoomMeta.url(position.symbol, 'USD', zoomMeta.limit)
    );

    const data = { zoom: position.zoom };

    // let data = responseUSD.Data.map(item => ({
    //   time: moment(item.time * 1000).format(zoomMeta.format),
    //   usd: item.close,
    // }));

    // if (position.symbol !== 'BTC') {
    //   const responseBTC = await getFromCache(
    //     zoomMeta.url(position.symbol, 'BTC', zoomMeta.limit)
    //   );
    //   data = data.map((item, index) => ({
    //     ...item,
    //     btc: responseBTC.Data[index].close,
    //   }));
    // }

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

  renderChart2 = () => {
    const { data } = this.state;
    if (!data) return;

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
        // {
        //   type: 'all',
        //   text: 'All',
        // },
      ],
    };

    rangeSelector.buttons = rangeSelector.buttons.map(b => ({
      ...b,
      events: {
        click: this.handleZoom(b.text.toLowerCase()),
      },
    }));

    rangeSelector.selected = rangeSelector.buttons.findIndex(
      b => b.text === this.props.position.zoom.toLowerCase()
    );

    const config = {
      rangeSelector,
      // title: {
      //   text: this.props.position.symbol,
      // },
      series,
      yAxis,
    };

    return <ReactHighstock config={config} />;
  };

  handleDelete = () => this.props.deletePosition(this.props.position.__id);
  handleZoom = zoom => () =>
    this.props.savePosition({ ...this.props.position, zoom });

  render() {
    const { position } = this.props;
    console.log('position', position.symbol, 'rendered');
    return (
      <Fragment>
        <Elevation ripple={false}>
          <section>
            <h2>{position.symbol}</h2>

            {/*<div className="position-zoom-container">*/}
            {/*{ZOOM.map(z => (*/}
            {/*<ActionButton*/}
            {/*key={z.name}*/}
            {/*handleClick={this.handleZoom(z.name)}*/}
            {/*secondary={z.name === position.zoom}*/}
            {/*raised={true}*/}
            {/*dense={true}*/}
            {/*>*/}
            {/*{z.name}*/}
            {/*</ActionButton>*/}
            {/*))}*/}
            {/*</div>*/}

            <ActionButton handleClick={this.handleDelete}>Delete</ActionButton>
          </section>
          {this.renderChart2()}
        </Elevation>
      </Fragment>
    );
  }
}
