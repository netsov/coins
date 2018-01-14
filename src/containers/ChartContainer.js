import { connect } from 'react-redux';

import { Chart } from '../components/Chart';
import { HISTO_KEY } from '../utils';

import { getHisto, updateItem } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { positionId } = ownProps;
  const position = state.positions.find(p => p.__id === positionId) || {};
  const __meta = state.tickerById[positionId] || {};
  const { zoom } = position;
  const { symbol } = __meta;
  return {
    zoom,
    usd: state.histo[HISTO_KEY(symbol, 'USD', zoom)] || [],
    btc:
      (symbol !== 'BTC' && state.histo[HISTO_KEY(symbol, 'BTC', zoom)]) || [],
    position: position && {
      ...position,
      __meta,
    },
  };
};

export const ChartContainer = connect(mapStateToProps, {
  getHisto,
  updatePosition: updateItem,
})(Chart);
