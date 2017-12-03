import React from 'react';
// import './css/input.css';

import './style.css';
import classNames from 'classnames';
import '@material/textfield/dist/mdc.textfield.css';

export class InputField extends React.Component {
  constructor(ctx) {
    super(ctx);

    this.state = {
      value: this.props.initialValue || '',
    };
  }

  handleKeyPress = e => {
    if (e.key === 'Enter' && this.state.value) {
      this.props.handleChange(this.state.value);
    }
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleBlur = () => {
    this.props.handleChange(this.state.value);
  };

  render() {
    const {
      // value,
      name,
      rtl,
      fullWidth = true,
      required,
      validationText,
      handleChange,
      initialValue,
      ...rest
    } = this.props;
    return (
      <div className="mdc-text-field" dir={rtl ? 'rtl' : undefined}>
        <input
          {...rest}
          className={classNames({
            'mdc-text-field__input': true,
            'mdc-text-field--fullwidth': fullWidth,
          })}
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onKeyPress={this.handleKeyPress}
          aria-label={name}
        />
        <label
          htmlFor="my-text-field"
          className="mdc-text-field__label mdc-text-field__label--float-above"
        >
          {name + (required ? '*' : '')}
        </label>
        {validationText && (
          <p className="mdc-text-field-helptext mdc-text-field-helptext--persistent ">
            {validationText}
          </p>
        )}
      </div>
    );
  }
}
