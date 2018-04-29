import { connect } from 'react-redux';

import { Editor } from '../components/WatchlistItemEditor';
import {
  updateWatchlistItem,
  closeWatchlistItemEditor,
} from '../actions/watchlist';

const mapStateToProps = state => {
  return {
    item: state.watchlist.formItem,
    ticker: state.ticker,
  };
};

export default connect(mapStateToProps, {
  updateItem: updateWatchlistItem,
  closeEditor: closeWatchlistItemEditor,
})(Editor);
