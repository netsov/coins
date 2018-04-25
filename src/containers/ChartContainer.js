import { connect } from 'react-redux';

import { Chart } from '../components/Chart';
import { HISTO_KEY } from '../utils';

import { getHisto } from '../actions';
import { updatePosition } from '../actions/positions';

const mapStateToProps = (state, ownProps) => {
  const { positionId } = ownProps;
  const position = state.positions.find(p => p.__id === positionId) || {};
  const { zoom, __meta: { symbol } = {} } = position;
  return {
    zoom,
    usd: state.histo[HISTO_KEY(symbol, 'USD', zoom)] || [],
    btc:
      (symbol !== 'BTC' && state.histo[HISTO_KEY(symbol, 'BTC', zoom)]) || [],
    position,
  };
};

export const ChartContainer = connect(mapStateToProps, {
  getHisto,
  updatePosition: updatePosition,
})(Chart);
