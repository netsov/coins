import React, { Component, Fragment } from 'react';
import './style.css';

import ActionButton from '../ActionButton';
import Elevation from '../Elevation';

import Chart from 'chart.js';
import moment from 'moment';

// import { hysto } from '../../mocks';

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
  },
  {
    name: '7d',
    url: HYSTO_HOUR,
    format: 'DD HH:mm',
    limit: 7 * 24,
  },
  {
    name: '1m',
    url: HYSTO_DAY,
    format: 'MMM Do',
    limit: 30,
  },
  {
    name: '3m',
    url: HYSTO_DAY,
    format: 'MMM Do',
    limit: 90,
  },
  {
    name: '1y',
    url: HYSTO_DAY,
    format: 'MMM Do',
    limit: 360,
  },
];

const ZOOM_INDEX = ZOOM.reduce(
  (prev, next) => ({ ...prev, [next.name]: next }),
  {}
);

class Position extends Component {
  constructor(ctx) {
    super(ctx);

    this.chart = null;
    this.chartRef = null;
  }

  async componentDidMount() {
    await this.drawChart(this.props.position);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.position.zoom !== this.props.position.zoom)
      await this.drawChart(this.props.position);
  }

  async drawChart(position) {
    const zoom = ZOOM_INDEX[position.zoom];
    if (!zoom) return;
    // const { symbol, zoom } = position;
    const response = await (await fetch(
      zoom.url(position.symbol, 'USD', zoom.limit)
    )).json();

    const data = response.Data;

    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.chartRef, {
      type: 'line',
      options: {
        legend: {
          display: false,
        },
      },
      data: {
        labels: data.map(d => {
          // const dd = new Date(d.time * 1000);
          // return `${dd.getHours()}:${dd.getMinutes()}`;

          return moment(d.time * 1000).format(zoom.format);
          // return moment(d.time * 1000).format('HH:mm');
        }),
        datasets: [
          {
            // label: 'apples',
            data: data.map(d => d.close),
            // backgroundColor: 'blue',
            // pointHitRadius: 0,
            pointRadius: 1,
          },
        ],
      },
    });
  }

  handleDelete = () => this.props.deletePosition(this.props.position.__id);
  handleZoom = zoom => () =>
    this.props.savePosition({ ...this.props.position, zoom });

  render() {
    const { position } = this.props;
    return (
      <Fragment>
        <Elevation ripple={true}>
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
          <canvas ref={ref => (this.chartRef = ref)} />
          {/*{JSON.stringify(position)}*/}
        </Elevation>
      </Fragment>
    );
  }
}

class Positions extends Component {
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

export default Positions;
