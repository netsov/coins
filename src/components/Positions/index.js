import React, { Component } from 'react';
import classNames from 'classnames';

import './style.css';
import { Position } from '../Position';

export class Positions extends Component {
  async componentDidMount() {
    this.props.getPositions();
  }

  render() {
    const { positions, deletePosition, savePosition } = this.props;
    return (
      <div
        className={classNames({
          'positions-container': true,
          'positions-container--compact': true,
        })}
      >
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
