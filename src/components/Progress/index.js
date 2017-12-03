import React from 'react';

import './style.css';
import '@material/linear-progress/dist/mdc.linear-progress.css';

export const Progress = ({ show }) =>
  show ? (
    <div
      role="progressbar"
      className="mdc-linear-progress mdc-linear-progress--indeterminate"
    >
      <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
        <span className="mdc-linear-progress__bar-inner" />
      </div>
      <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        <span className="mdc-linear-progress__bar-inner" />
      </div>
    </div>
  ) : null;
