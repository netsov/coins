import React from 'react';

import classNames from 'classnames';
import { Close, Menu, Delete, Edit } from '../../material/Icons';

import './style.css';
import '@material/toolbar/dist/mdc.toolbar.css';

const Icon = ({ children, handleClick }) => {
  return (
    <a href="#" className="mdc-toolbar__menu-icon" onClick={handleClick}>
      {children}
    </a>
  );
};

export const Toolbar = ({
  header,
  selected,
  clearSelected,
  deletePosition,
  openEditor,
}) => {
  const edit = selected.length > 0;
  return (
    <header
      className={classNames('mdc-toolbar', 'mdc-toolbar--fixed', {
        'toolbar--edit': edit,
      })}
    >
      <div className="mdc-toolbar__row">
        <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
          {edit ? (
            <Icon handleClick={clearSelected}>
              <Close />
            </Icon>
          ) : null}
          <span className="mdc-toolbar__title">
            {edit ? `${selected.length} Selected` : null}
          </span>
        </section>
        {edit ? (
          <section className="mdc-toolbar__section mdc-toolbar__section--align-end">
            {selected.length === 1 ? (
              <Icon handleClick={() => openEditor(...selected)}>
                <Edit />
              </Icon>
            ) : null}
            <Icon handleClick={() => deletePosition(selected)}>
              <Delete />
            </Icon>
          </section>
        ) : null}
      </div>
    </header>
  );
};
