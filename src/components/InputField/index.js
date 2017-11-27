import React from 'react';
// import './css/input.css';

import './style.css';
import classNames from 'classnames';
import '@material/textfield/dist/mdc.textfield.css';

export default class InputField extends React.Component {
  // state = {
  //   value: '',
  // };

  static defaultProps = {
    // reset: true,
  };

  // componentWillMount() {
  //   console.log('componentWillMount');
  //   this.setState({ value: this.props.value });
  // }

  handleKeyPress = e => {
    console.log('handleKeyPress', e.target.value);
    if (e.key === 'Enter' && this.state.value) {
      this.props.onEnter(this.state.value);
      // if (this.props.reset) this.setState({ value: '' });
    }
  };
  render() {
    const {
      value,
      name,
      rtl,
      fullWidth = true,
      required,
      validationText,
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
          // value={this.state.value}
          value={value}
          // onChange={this.handleChange}
          // onKeyPress={this.handleKeyPress}
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
