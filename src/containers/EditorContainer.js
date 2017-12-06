import { connect } from 'react-redux';

import { Editor } from '../components/Editor';
import { savePosition, closeEditor } from '../actions';

const mapStateToProps = state => {
  return {
    position: state.position
  };
};

export const EditorContainer = connect(mapStateToProps, {
  savePosition,
  closeEditor
})(Editor);
