import React, { Component } from 'react';
import './components/Editor/style.css';

import Editor from './components/Editor';
import Positions from './containers/Positions';

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
