import { connect } from 'react-redux';

import { Chart } from '../components/Chart';
import { HISTO_KEY } from '../utils';

import { getHisto, updatePosition } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { position: { zoom, symbol } } = ownProps;
  return {
    zoom: zoom,
    usd: state.histo[HISTO_KEY(symbol, 'USD', zoom)] || [],
    btc:
      (symbol !== 'BTC' && state.histo[HISTO_KEY(symbol, 'BTC', zoom)]) || [],
  };
};

export const ChartContainer = connect(mapStateToProps, {
  getHisto,
  updatePosition,
})(Chart);
