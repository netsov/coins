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
    const {
      positions,
      deletePosition,
      savePosition,
      selected,
      toggleSelected,
    } = this.props;
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
                selected={selected}
                deletePosition={deletePosition}
                savePosition={savePosition}
                toggleSelected={toggleSelected}
              />
            </li>
          ))}
        </ul>
        <FAB handleClick={() => this.props.openEditor()}>
          <Add />
        </FAB>
      </Fragment>
    );
  }
}
