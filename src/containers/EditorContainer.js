import { connect } from 'react-redux';

import {Editor} from '../components/Editor';
import { savePosition } from '../actions';

const mapStateToProps = state => {
  return {
  };
};

export const EditorContainer = connect(mapStateToProps, {
  savePosition
})(Editor);
