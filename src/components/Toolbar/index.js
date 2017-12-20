import React, { Fragment } from 'react';

import classNames from 'classnames';
import { Close, Delete, Edit, Settings } from '../material/Icons/index';

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
  totalUSD,
  totalBTC,
  openSettings,
}) => {
  const edit = selected.length > 0;
  console.log('toolbar rendered');
  return (
    <header
      className={classNames('mdc-toolbar', 'mdc-toolbar--fixed', {
        'toolbar--edit': edit,
      })}
    >
      <div className="mdc-toolbar__row">
        {edit ? null : (
          <section className="">
            <h3>
              Total: {totalUSD ? `$${totalUSD}` : ''}&nbsp;|&nbsp;
              {totalBTC ? `₿${totalBTC}` : ''}
            </h3>
            <Icon handleClick={openSettings}>
              <Settings />
            </Icon>
          </section>
        )}

        {edit ? (
          <Fragment>
            <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
              <Icon handleClick={clearSelected}>
                <Close />
              </Icon>
              <span className="mdc-toolbar__title">
                {edit ? `${selected.length} Selected` : null}
              </span>
            </section>
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
          </Fragment>
        ) : null}
      </div>
    </header>
  );
};
