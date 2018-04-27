import { EditorContainerHOC } from './EditorContainer';
import { updatePosition } from '../actions/positions';

export default EditorContainerHOC(updatePosition);
