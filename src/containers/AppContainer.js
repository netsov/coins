import { connect } from 'react-redux';

import { App } from '../components/App';
import { getTickerData } from '../actions';

export default connect(null, {
  getTickerData,
})(App);
