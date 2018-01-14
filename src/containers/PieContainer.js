import { connect } from 'react-redux';

import { Pie } from '../components/Pie';

import { getItems } from '../actions/positions';

const mapStateToProps = state => {
  const tickerById = state.ticker.reduce(
    (acc, next) => ({ ...acc, [next.id]: next }),
    {}
  );
  return {
    positions: state.positions.map(p => ({
      ...p,
      __meta: tickerById[p.__id] || {},
    })),
  };
};

export const PieContainer = connect(mapStateToProps, {
  getPositions: getItems,
})(Pie);
