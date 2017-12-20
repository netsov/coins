import React, { Component } from 'react';
import classNames from 'classnames';

import './style.css';
import '@material/elevation/dist/mdc.elevation.css';
import { Checked, Unchecked } from '../Icons';

export class Elevation extends Component {
  state = {
    hovered: false,
  };
  toggleHovered = hovered => () => {
    const { onHoverChange } = this.props;
    this.setState({ hovered });
    onHoverChange && onHoverChange(hovered);
  };

  render() {
    const {
      children,
      ripple,
      // zIndex = 4,
      checked,
      // toggleSelected,
      hoverClass,
    } = this.props;
    const { hovered } = this.state;
    return (
      <div
        className={classNames('my-elevation-container', {
          // 'my-elevation-container-checked': checked,
        })}
        onMouseOver={this.toggleHovered(true)}
        onMouseLeave={this.toggleHovered(false)}
      >
        <div
          className={classNames(
            // `my-elevation mdc-elevation--z${hovered ? zIndex * 2 : zIndex}`,
            `my-elevation`,
            {
              [hoverClass]: hovered || checked,
              'mdc-elevation--z2': !(hovered || checked),
              'my-elevation-ripple': ripple,
              // 'my-elevation-checked': checked,
            }
          )}
        >
          {children}
        </div>

        {/*{(checked || hovered) && (*/}
        {/*<span className="select-icon" onClick={toggleSelected}>*/}
        {/*<Checked />*/}
        {/*</span>*/}
        {/*)}*/}
        {/*{((!checked && hovered) || unchecked) && (*/}
        {/*<span className="select-icon" onClick={toggleSelected}>*/}
        {/*<Unchecked />*/}
        {/*</span>*/}
        {/*)}*/}
      </div>
    );
  }
}
