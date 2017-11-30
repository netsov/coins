import React, { Component, Fragment } from 'react';
import './style.css';

import ActionButton from '../ActionButton';

class Position extends Component {
  handleDelete = positionId => () => this.props.deletePosition(positionId);
  render() {
    const { position } = this.props;
    return (
      <Fragment>
        <p>
          {JSON.stringify(position)}
          <ActionButton handleClick={this.handleDelete(position.__id)}>
            Delete
          </ActionButton>
        </p>
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
    return positions.map(position => (
      <Position
        key={position.__id}
        position={position}
        deletePosition={deletePosition}
      />
    ));
  }
}

export default Positions;
