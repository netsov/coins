import React, { Component } from 'react';
import classNames from 'classnames';

import './style.css';
import { Position } from '../Position';
import { Add, Checked } from '../material/Icons';
import { FAB } from '../material/FAB';

const SelectAll = ({ toggleSelectAll, fulfilled }) => {
  return (
    <div
      className={classNames('select-all', {
        'select-all--fulfilled': fulfilled,
      })}
    >
      <span className="select-all-icon" onClick={toggleSelectAll}>
        <Checked />
      </span>
    </div>
  );
};

export class Positions extends Component {
  async componentDidMount() {
    this.props.getSettings();
    this.props.getPositions();
  }

  render() {
    const {
      positions,
      updatePosition,
      selected,
      toggleSelected,
      toggleSelectAll,
      showCharts
    } = this.props;
    console.log('Positions rendered');
    return (
      <main className="mdc-toolbar-fixed-adjust">
        {selected.length > 0 ? (
          <SelectAll
            toggleSelectAll={toggleSelectAll}
            fulfilled={positions.length === selected.length}
          />
        ) : null}
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
                updatePosition={updatePosition}
                toggleSelected={toggleSelected}
                showChart={showCharts}
              />
            </li>
          ))}
        </ul>
        <FAB handleClick={() => this.props.openEditor()}>
          <Add />
        </FAB>
      </main>
    );
  }
}
