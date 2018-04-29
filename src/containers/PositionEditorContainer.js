import { connect } from 'react-redux';

import { Editor } from '../components/PositionEditor';
import { updatePosition, closePositionEditor } from '../actions/positions';

const mapStateToProps = state => {
  return {
    item: state.positions.formItem,
    ticker: state.ticker,
  };
};

export default connect(mapStateToProps, {
  updateItem: updatePosition,
  closeEditor: closePositionEditor,
})(Editor);
