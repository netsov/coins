import React, { Component } from 'react';
import classNames from 'classnames';

import './style.css';
import '@material/elevation/dist/mdc.elevation.css';

export default class Elevation extends Component {
  state = {
    hovered: false
  };
  toggleHovered = hovered => () => {
    this.props.ripple && this.setState({ hovered });
    this.props.onHoverChange && this.props.onHoverChange(hovered);
  };

  render() {
    const { children, ripple } = this.props;
    const { hovered } = this.state;
    return (
      <div
        onMouseOver={this.toggleHovered(true)}
        onMouseLeave={this.toggleHovered(false)}
        className={classNames(
          `my-elevation mdc-elevation--z${hovered ? 8 : 4}`,
          {
            'my-elevation-ripple': ripple
          }
        )}
      >
        {children}
      </div>
    );
  }
}
