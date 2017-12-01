import React, { Component, Fragment } from 'react';
import './style.css';

import ActionButton from '../ActionButton';
import Elevation from '../Elevation';

import Chart from 'chart.js';
import moment from 'moment';

import { hysto } from '../../mocks';

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

  handleDelete = positionId => () => this.props.deletePosition(positionId);

  render() {
    const { position } = this.props;
    return (
      <Fragment>
        <Elevation ripple={true}>
          <section>
            <h2>{position.symbol}</h2>

            <div className="position-zoom-container">
              <ActionButton raised={true} secondary={true}>
                1d
              </ActionButton>
              <ActionButton raised={true}>7d</ActionButton>
              <ActionButton raised={true}>1m</ActionButton>
              <ActionButton raised={true}>3m</ActionButton>
              <ActionButton raised={true}>1y</ActionButton>
            </div>

            <ActionButton handleClick={this.handleDelete(position.__id)}>
              Delete
            </ActionButton>
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
    const { positions, deletePosition } = this.props;
    return (
      <div className="positions-container">
        {positions.map(position => (
          <Position
            key={position.__id}
            position={position}
            deletePosition={deletePosition}
          />
        ))}
      </div>
    );
  }
}

export default Positions;
