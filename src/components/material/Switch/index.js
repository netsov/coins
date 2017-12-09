import React from 'react';

import './style.css';
import '@material/switch/dist/mdc.switch.css';

export const Switch = ({ children, checked, onToggle, disabled }) => (
  <div className="switch-combo">
    <div className="mdc-switch">
      <input
        className="mdc-switch__native-control"
        id={children}
        type="checkbox"
        checked={!!checked}
        onChange={onToggle}
        disabled={!!disabled}
        aria-label={children}
      />
      <div className="mdc-switch__background">
        <div className="mdc-switch__knob" />
      </div>
    </div>
    &nbsp;
    <label
      htmlFor={children}
      className="mdc-switch-label"
      disabled={disabled}
      checked={checked.toString()}
    >
      {children}
    </label>
  </div>
);
