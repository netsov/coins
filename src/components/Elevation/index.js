import React, { Component } from 'react';
import classNames from 'classnames';

import './style.css';
import '@material/elevation/dist/mdc.elevation.css';

export class Elevation extends Component {
  state = {
    hovered: false,
  };
  toggleHovered = hovered => () => {
    this.props.ripple && this.setState({ hovered });
    this.props.onHoverChange && this.props.onHoverChange(hovered);
  };

  render() {
    const { children, ripple, zIndex = 4 } = this.props;
    const { hovered } = this.state;
    return (
      <div
        onMouseOver={ripple ? this.toggleHovered(true) : undefined}
        onMouseLeave={ripple ? this.toggleHovered(false) : undefined}
        className={classNames(
          `my-elevation mdc-elevation--z${hovered ? zIndex * 2 : zIndex}`,
          {
            'my-elevation-ripple': ripple,
          }
        )}
      >
        {children}
      </div>
    );
  }
}
