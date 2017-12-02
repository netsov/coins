import React from 'react';
import classNames from 'classnames';

import './style.css';
import '@material/button/dist/mdc.button.css';

export const ActionButton = ({
  disabled,
  handleClick,
  children,
  raised,
  secondary,
  dense,
}) => {
  return (
    <button
      className={classNames({
        'mdc-button': true,
        'mdc-button--raised': raised,
        'secondary-filled-button': secondary, // TODO: doesn't work
        'mdc-button--dense': dense,
      })}
      onClick={(!disabled && handleClick) || undefined}
      disabled={disabled}
      aria-label={children}
    >
      {children}
    </button>
  );
};
