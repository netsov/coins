import { connect } from 'react-redux';

import { App } from '../components/App';
import { getTickerData, getUser } from '../actions';

export default connect(null, {
  getTickerData,
  getUser
})(App);
