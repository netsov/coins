import { EditorContainerHOC } from './EditorContainer';
import { updatePosition, closePositionEditor } from '../actions/positions';

export default EditorContainerHOC(
  updatePosition,
  closePositionEditor,
  'positions'
);
