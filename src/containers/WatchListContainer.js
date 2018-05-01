import { connect } from 'react-redux';

import { Watchlist } from '../components/Watchlist';
import {
  getWatchlistItems,
  updateWatchlistItem,
  deleteWatchlistItems,
  toggleSelectAlldWatchlistItems,
  toggleSelectedWatchlistItems,
  openWatchlistItemEditor,
} from '../actions/watchlist';

const mapStateToProps = state => {
  return {
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
})(Watchlist);
