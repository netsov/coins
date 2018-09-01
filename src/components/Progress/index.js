import React from 'react';

import '@material/linear-progress/dist/mdc.linear-progress.min.css';
import './index.css';

export const Progress = () => (
  <div
    role="progressbar"
    className="mdc-linear-progress mdc-linear-progress--indeterminate"
  >
    <div className="mdc-linear-progress__buffering-dots" />
    <div className="mdc-linear-progress__buffer" />
    <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
      <span className="mdc-linear-progress__bar-inner" />
    </div>
    <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
      <span className="mdc-linear-progress__bar-inner" />
    </div>
  </div>
);
