import { connect } from 'react-redux';

import { App } from '../components/App';
import { getTickerData, getUserAndItems } from '../actions';

export default connect(null, {
  getTickerData,
  getUserAndItems
})(App);
