import React, { Component } from 'react';
import './components/Editor/style.css';

import Positions from './containers/Positions';
import Editor from './containers/Editor';

class App extends Component {
  async componentDidMount() {}

  async componentWillUpdate(nextProps, nextState) {}

  render() {
    return (
      <div>
        <Positions />
        <Editor />
      </div>
    );
  }
}

export default App;
