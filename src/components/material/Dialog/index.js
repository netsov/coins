import React from 'react';
import classNames from 'classnames';

import './style.css';
import '@material/dialog/dist/mdc.dialog.css';

export const Dialog = ({ edit, open, children, buttons }) => (
  <aside
    className={classNames('mdc-dialog', { 'mdc-dialog--open': open })}
    role="alertdialog"
    aria-labelledby="my-mdc-dialog-label"
    aria-describedby="my-mdc-dialog-description"
  >
    <div className="mdc-dialog__surface">
      <header className="mdc-dialog__header">
        <h2 className="mdc-dialog__header__title">
          {edit ? 'Edit' : 'Add new position'}
        </h2>
      </header>
      <section className="mdc-dialog__body">{children}</section>
      <footer className="mdc-dialog__footer">
        {buttons}
        {/*<button*/}
        {/*type="button"*/}
        {/*className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel"*/}
        {/*onClick={handleCancel}*/}
        {/*>*/}
        {/*Cancel*/}
        {/*</button>*/}
        {/*<button*/}
        {/*type="button"*/}
        {/*className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept"*/}
        {/*onClick={handleSave}*/}
        {/*>*/}
        {/*Save*/}
        {/*</button>*/}
      </footer>
    </div>
    <div className="mdc-dialog__backdrop" />
  </aside>
);
