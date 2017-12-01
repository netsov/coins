import React, { Component, Fragment } from 'react';
import './style.css';

import ActionButton from '../ActionButton';
import Elevation from '../Elevation';

import Chart from 'chart.js';

class Position extends Component {
  constructor(ctx) {
    super(ctx);

    this.chart = null;
  }
  async componentDidMount() {
    new Chart(this.chart, {
      type: 'line',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [
          {
            label: 'apples',
            data: [12, 19, 3, 17, 6, 3, 7],
            // backgroundColor: 'blue',
          },
          {
            label: 'oranges',
            data: [2, 29, 5, 5, 2, 3, 10],
            // backgroundColor: 'rgba(255,153,0,0.4)',
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
        <Elevation>
          <section>
            <h2>{position.symbol}</h2>
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
