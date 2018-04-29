import { connect } from 'react-redux';

import { Watchlist } from '../components/Watchlist';
import { getTickerData } from '../actions';
import {
  getWatchlistItems,
  updateWatchlistItem,
  deleteWatchlistItems,
  toggleSelectAlldWatchlistItems,
  toggleSelectedWatchlistItems,
  openWatchlistItemEditor,
} from '../actions/watchlist';
import { getTimestamp } from '../utils';

const mapStateToProps = state => {
  return {
    delta: state.timestamp ? getTimestamp() - state.timestamp : null,
    editorIsOpened: !!state.watchlist.formItem,
    items: state.watchlist.items,
    selected: state.watchlist.selected,
  };
};

export default connect(mapStateToProps, {
  getWatchlistItems,
  updateWatchlistItem,
  deleteWatchlistItems,
  toggleSelected: toggleSelectedWatchlistItems,
  toggleSelectAll: toggleSelectAlldWatchlistItems,
  openEditor: openWatchlistItemEditor,
  getTickerData,
})(Watchlist);
