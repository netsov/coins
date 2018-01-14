import { connect } from 'react-redux';

import { Watchlist } from '../components/Watchlist';
import {
  toggleSelected,
  toggleSelectAll,
  openEditor,
  getTickerData,
} from '../actions';
import { getItems, updateItem, deleteItems } from '../actions/watchlist';

const mapStateToProps = state => {
  return {
    items: state.watchlist.map(p => ({
      ...p,
      __meta: state.tickerById[p.__id] || {},
    })),
    selected: state.selected,
  };
};

export const WatchListContainer = connect(mapStateToProps, {
  getItems,
  updateItem,
  toggleSelected,
  toggleSelectAll,
  openEditor,
  getTickerData,
  deleteItems,
})(Watchlist);
