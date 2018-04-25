import { connect } from 'react-redux';

import { Chart } from '../components/Chart';
import { HISTO_KEY } from '../utils';

import { getHisto } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { item } = ownProps;
  const { zoom, __meta: { symbol } = {} } = item;
  return {
    zoom,
    usd: state.histo[HISTO_KEY(symbol, 'USD', zoom)] || [],
    btc:
      (symbol !== 'BTC' && state.histo[HISTO_KEY(symbol, 'BTC', zoom)]) || [],
    item,
  };
};

export const ChartContainer = updateItem => connect(mapStateToProps, {
  getHisto,
  updateItem,
})(Chart);
