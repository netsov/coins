import React from 'react';

import './style.css';
import '@material/card/dist/mdc.card.css';

export const Card = ({ header, children }) => (
  <div className="mdc-card right">
    {header}
    <section className="mdc-card__primary">{children}</section>
  </div>
);

