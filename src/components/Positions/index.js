import React, { Component } from 'react';
import classNames from 'classnames';
import isEqual from 'lodash.isequal';

import './style.css';
import { Position } from '../Position';
import { Add, Checked } from '../material/Icons';
import { FAB } from '../material/FAB';

// const SelectAll = ({ toggleSelectAll, fulfilled }) => {
//   return (
//     <div
//       className={classNames('select-all', {
//         'select-all--fulfilled': fulfilled,
//       })}
//     >
//       <span className="select-all-icon" onClick={toggleSelectAll}>
//         <Checked />
//       </span>
//     </div>
//   );
// };

export class Positions extends Component {
  interval = 1000 * 60;
  intervalID = null;

  componentWillUnmount() {
    this.resetInterval();
  }

  resetInterval() {
    this.intervalID && clearInterval(this.intervalID);
  }

  async componentDidMount() {
    this.props.getSettings();
    this.props.getPositions();
    this.updatePrices(this.props.positions);
  }

  async componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.positions, nextProps.positions)) {
      this.updatePrices(nextProps.positions, true);
    }
  }

  updatePrices(positions, force) {
    if (force) this.resetInterval();
    this.props.getPrices(positions, force);
    this.intervalID = setInterval(
      () => this.props.getPrices(positions),
      this.interval
    );
  }

  render() {
    const {
      positions,
      prices,
      updatePosition,
      selected,
      toggleSelected,
      // toggleSelectAll,
      showCharts,
    } = this.props;
    console.log('Positions rendered');
    return (
      <main className="mdc-toolbar-fixed-adjust">
        {/*<Elevation>*/}
        {/*<table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">*/}
        {/*<thead>*/}
        {/*<tr>*/}
        {/*<th className="mdl-data-table__cell--non-numeric">Material</th>*/}
        {/*<th>Quantity</th>*/}
        {/*<th>Unit price</th>*/}
        {/*</tr>*/}
        {/*</thead>*/}
        {/*<tbody>*/}
        {/*<tr>*/}
        {/*<td className="mdl-data-table__cell--non-numeric">*/}
        {/*Acrylic (Transparent)*/}
        {/*</td>*/}
        {/*<td>25</td>*/}
        {/*<td>$2.90</td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*<td className="mdl-data-table__cell--non-numeric">*/}
        {/*Plywood (Birch)*/}
        {/*</td>*/}
        {/*<td>50</td>*/}
        {/*<td>$1.25</td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*<td className="mdl-data-table__cell--non-numeric">*/}
        {/*Laminate (Gold on Blue)*/}
        {/*</td>*/}
        {/*<td>10</td>*/}
        {/*<td>$2.35</td>*/}
        {/*</tr>*/}
        {/*</tbody>*/}
        {/*</table>*/}
        {/*</Elevation>*/}

        {/*{selected.length > 0 ? (*/}
        {/*<SelectAll*/}
        {/*toggleSelectAll={toggleSelectAll}*/}
        {/*fulfilled={positions.length === selected.length}*/}
        {/*/>*/}
        {/*) : null}*/}
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
                prices={prices}
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
