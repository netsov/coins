import React, { Component, Fragment } from 'react';
import './style.css';

import { ActionButton } from '../ActionButton';
import { Elevation } from '../Elevation';

import moment from 'moment';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

import { getFromCache } from '../../utils';

const HYSTO_HOUR = (fsym, tsym, limit) =>
  `https://min-api.cryptocompare.com/data/histohour?fsym=${fsym}&tsym=${
    tsym
  }&limit=${limit}`;

const HYSTO_DAY = (fsym, tsym, limit) =>
  `https://min-api.cryptocompare.com/data/histoday?fsym=${fsym}&tsym=${
    tsym
  }&limit=${limit}`;

const ZOOM = [
  {
    name: '1d',
    url: HYSTO_HOUR,
    format: 'HH:mm',
    limit: 24,
    interval: 1,
  },
  {
    name: '7d',
    url: HYSTO_HOUR,
    format: 'MMM D',
    limit: 7 * 24,
    interval: 24,
  },
  {
    name: '1m',
    url: HYSTO_DAY,
    format: 'MMM D',
    limit: 30,
    interval: 1,
  },
  {
    name: '3m',
    url: HYSTO_DAY,
    format: 'MMM D',
    limit: 90,
    interval: 7,
  },
  {
    name: '1y',
    url: HYSTO_DAY,
    format: 'MMM D',
    limit: 360,
    interval: 30,
  },
];

const ZOOM_INDEX = ZOOM.reduce(
  (prev, next) => ({ ...prev, [next.name]: next }),
  {}
);

class Position extends Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData() {
    const { position } = this.props;
    const zoom = ZOOM_INDEX[position.zoom];
    if (!zoom) return;

    const responseUSD = await getFromCache(
      zoom.url(position.symbol, 'USD', zoom.limit)
    );

    let data = responseUSD.Data.map(item => ({
      time: moment(item.time * 1000).format(zoom.format),
      usd: item.close,
    }));

    if (position.symbol !== 'BTC') {
      const responseBTC = await getFromCache(
        zoom.url(position.symbol, 'BTC', zoom.limit)
      );
      data = data.map((item, index) => ({
        ...item,
        btc: responseBTC.Data[index].close,
      }));
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
    const btcLine = !!data[0].btc;

    const { position } = this.props;
    const zoom = ZOOM_INDEX[position.zoom];

    return (
      <ResponsiveContainer minWidth={600} minHeight={600}>
        <LineChart
          // width="100%"
          // width={730}
          // height={250}
          data={this.state.data}
          margin={{ left: 40, right: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" interval={zoom.interval} />
          <YAxis dataKey="usd" yAxisId="usd" orientation="right">
            <Label
              angle={90}
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
              offset={70}
            >
              Price (USD)
            </Label>
          </YAxis>
          {btcLine && (
            <YAxis
              dataKey="btc"
              yAxisId="btc"
              orientation="left"
              padding={{ left: 50, right: 50 }}
            >
              <Label
                angle={-90}
                position="insideRight"
                style={{ textAnchor: 'middle' }}
                offset={80}
              >
                Price (BTC)
              </Label>
            </YAxis>
          )}
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="usd"
            stroke="#8884d8"
            yAxisId="usd"
            dot={false}
            activeDot={{ strokeWidth: 1, r: 4 }}
          />
          {btcLine && (
            <Line
              type="monotone"
              dataKey="btc"
              stroke="#82ca9d"
              yAxisId="btc"
              dot={false}
              activeDot={{ strokeWidth: 1, r: 4 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  handleDelete = () => this.props.deletePosition(this.props.position.__id);
  handleZoom = zoom => () =>
    this.props.savePosition({ ...this.props.position, zoom });

  render() {
    const { position } = this.props;
    return (
      <Fragment>
        <Elevation ripple={false}>
          <section>
            <h2>{position.symbol}</h2>

            <div className="position-zoom-container">
              {ZOOM.map(z => (
                <ActionButton
                  key={z.name}
                  handleClick={this.handleZoom(z.name)}
                  secondary={z.name === position.zoom}
                  raised={true}
                  dense={true}
                >
                  {z.name}
                </ActionButton>
              ))}
            </div>

            <ActionButton handleClick={this.handleDelete}>Delete</ActionButton>
          </section>
          {this.renderChart()}
        </Elevation>
      </Fragment>
    );
  }
}

export class Positions extends Component {
  async componentDidMount() {
    this.props.getPositions();
  }

  render() {
    const { positions, deletePosition, savePosition } = this.props;
    return (
      <div className="positions-container">
        {positions.map(position => (
          <Position
            key={position.__id}
            position={position}
            deletePosition={deletePosition}
            savePosition={savePosition}
          />
        ))}
      </div>
    );
  }
}
