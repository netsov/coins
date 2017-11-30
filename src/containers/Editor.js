import { connect } from 'react-redux';

import Editor from '../components/Editor';
import { savePosition } from '../actions';

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, {
  savePosition
})(Editor);
