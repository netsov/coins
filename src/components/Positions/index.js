import React, { Component, Fragment } from 'react';
import './style.css';

import ActionButton from '../ActionButton';
import Elevation from '../Elevation';

import Chart from 'chart.js';
import moment from 'moment';

import { hysto } from '../../mocks';

const zoomValues = ['1d', '7d', '1m', '3m', '1y', 'all'];

class Position extends Component {
  constructor(ctx) {
    super(ctx);

    this.chart = null;
  }

  async componentDidMount() {
    new Chart(this.chart, {
      type: 'line',
      data: {
        labels: hysto.Data.map(d => {
          // const dd = new Date(d.time * 1000);
          // return `${dd.getHours()}:${dd.getMinutes()}`;

          return moment(d.time * 1000).format('HH:mm');
        }),
        datasets: [
          {
            // label: 'apples',
            data: hysto.Data.map(d => d.close),
            // backgroundColor: 'blue',
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
              {zoomValues.map(z => (
                <ActionButton
                  handleClick={this.handleZoom(z)}
                  secondary={z === position.zoom}
                  raised={true}
                  dense={true}
                >
                  {z}
                </ActionButton>
              ))}
            </div>

            <ActionButton handleClick={this.handleDelete}>Delete</ActionButton>
          </section>
          <canvas ref={ref => (this.chart = ref)} />
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
