import { connect } from 'react-redux';

import { Chart } from '../components/Chart';
import { HISTO_KEY } from '../utils';

import { getHisto } from '../actions';

const mapStateToProps = reducerName => (state, ownProps) => {
  const { itemId } = ownProps;
  const item = state[reducerName].items.find(item => item.__id === itemId);
  const __meta = state.tickerById[itemId];
  const { zoom } = item;
  const { symbol } = __meta;
  return {
    zoom,
    usd: state.histo[HISTO_KEY(symbol, 'USD', zoom)] || [],
    btc:
      (symbol !== 'BTC' && state.histo[HISTO_KEY(symbol, 'BTC', zoom)]) || [],
    item,
    __meta
  };
};

export const ChartContainer = (updateItem, reducerName) =>
  connect(mapStateToProps(reducerName), {
    getHisto,
    updateItem,
  })(Chart);
