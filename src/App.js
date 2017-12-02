import React, { Component, Fragment } from 'react';
import './components/Editor/style.css';

import { PositionsContainer } from './containers/PositionsContainer';
import { EditorContainer } from './containers/EditorContainer';

export class App extends Component {
  render() {
    return (
      <Fragment>
        <PositionsContainer />
        <EditorContainer />
      </Fragment>
    );
  }
}
