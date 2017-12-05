import React from 'react';
import classNames from 'classnames';

import './style.css';
import '@material/fab/dist/mdc.fab.css';

export const FAB = ({ handleClick, children }) => {
  return (
    <button
      className={classNames({
        'mdc-fab': true,
      })}
      onClick={handleClick}
      // disabled={disabled}
      // aria-label={children}
    >
      {children}
    </button>
  );
};
