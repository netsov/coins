import React, { Component, Fragment } from 'react';
import './components/Editor/style.css';

import { PositionsContainer } from './containers/PositionsContainer';
import { EditorContainer } from './containers/EditorContainer';
import { ToolbarContainer } from './containers/ToolbarContainer';
import { SettingsContainer } from './containers/SettingsContainer';

export class App extends Component {
  render() {
    return (
      <Fragment>
        <ToolbarContainer />
        <PositionsContainer />
        <EditorContainer />
        <SettingsContainer />
      </Fragment>
    );
  }
}
