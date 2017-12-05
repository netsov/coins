import React, { Component, Fragment } from 'react';
import classNames from 'classnames';

import './style.css';
import { Position } from '../Position';
import { Add } from '../material/Icons';
import { FAB } from '../material/FAB';

export class Positions extends Component {
  async componentDidMount() {
    this.props.getPositions();
  }

  render() {
    const { positions, deletePosition, savePosition } = this.props;
    return (
      <Fragment>
        <ul
          className={classNames({
            'positions-container': true,
            'positions-container--compact': true,
          })}
        >
          {positions.map(position => (
            <li key={position.__id}>
              <Position
                position={position}
                deletePosition={deletePosition}
                savePosition={savePosition}
              />
            </li>
          ))}
        </ul>
        <FAB>
          <Add />
        </FAB>
      </Fragment>
    );
  }
}
