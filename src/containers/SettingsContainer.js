import React from 'react';
import { connect } from 'react-redux';

import { Settings } from '../components/Settings';
import { closeSettings, updateSettings } from '../actions';

const mapStateToProps = state => {
  return {
    settings: state.settings,
    showSettings: state.showSettings,
  };
};

export const SettingsContainer = connect(mapStateToProps, {
  closeSettings,
  updateSettings
})(props => (props.showSettings ? <Settings {...props} /> : null));
