import React from 'react';

import './style.css';
import '@material/checkbox/dist/mdc.checkbox.css';

export const Checkbox = ({ checked = false, onToggle }) => (
  <div className="">
    <div className="mdc-checkbox">
      <input
        type="checkbox"
        className="mdc-checkbox__native-control"
        checked={checked}
        onClick={onToggle}
      />
      <div className="mdc-checkbox__background">
        <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path
            className="mdc-checkbox__checkmark__path"
            fill="none"
            stroke="white"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
          />
        </svg>
        <div className="mdc-checkbox__mixedmark" />
      </div>
    </div>
  </div>
);
