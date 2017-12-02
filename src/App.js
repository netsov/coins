import React, { Component, Fragment } from 'react';
import './components/Editor/style.css';

import Positions from './containers/Positions';
import Editor from './containers/Editor';

class App extends Component {
  async componentDidMount() {}

  async componentWillUpdate(nextProps, nextState) {}

  render() {
    return (
      <Fragment>
        <Positions />
        <Editor />
      </Fragment>
    );
  }
}

export default App;
