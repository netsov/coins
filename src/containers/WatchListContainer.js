import { connect } from 'react-redux';

import { Watchlist } from '../components/Watchlist';
import {
  toggleSelected,
  toggleSelectAll,
  openEditor,
  getTickerData,
} from '../actions';
import {
  getWatchlistItems,
  updateWatchlistItem,
  deleteWatchlistItems,
} from '../actions/watchlist';

const mapStateToProps = state => {
  return {
    items: state.watchlist,
    selected: state.selected,
  };
};

const WatchListContainer = connect(mapStateToProps, {
  getWatchlistItems,
  updateWatchlistItem,
  deleteWatchlistItems,
  toggleSelected,
  toggleSelectAll,
  openEditor: openEditor('watchlist'),
  getTickerData,
})(Watchlist);

export default WatchListContainer;
