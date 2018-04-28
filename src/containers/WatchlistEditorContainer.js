import { EditorContainerHOC } from './EditorContainer';
import {
  updateWatchlistItem,
  closeWatchlistItemEditor,
} from '../actions/watchlist';

export default EditorContainerHOC(
  updateWatchlistItem,
  closeWatchlistItemEditor,
  'watchlist'
);
