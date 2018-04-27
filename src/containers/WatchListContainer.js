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
    editorIsOpened: !!state.position,
    items: state.watchlist,
    selected: state.selected,
  };
};

export default connect(mapStateToProps, {
  getWatchlistItems,
  updateWatchlistItem,
  deleteWatchlistItems,
  toggleSelected,
  toggleSelectAll,
  openEditor: openEditor('watchlist'),
  getTickerData,
})(Watchlist);
