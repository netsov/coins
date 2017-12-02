import React, { Component } from 'react';
import './style.css';

import { Position } from '../Position';

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
