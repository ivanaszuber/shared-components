import React from 'react';

import PropTypes from 'prop-types';
import * as Styles from './style';
import { Warning } from '../Icon';
import Text from '../Text';

const Input = ({
  disabled,
  hasError,
  help,
  label,
  name,
  onChange,
  placeholder,
  size,
  type,
  value,
  ...props
}) => (
  <Styles.InputWrapper>
    {label.length > 0 && <Text htmlFor={name} type='label'>{label}</Text>}
    <Styles.InputStyled
      disabled={disabled}
      hasError={hasError}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      size={size}
      value={value}
      {...props}
    />
    {help.length > 0 && (
      <Text type='help' htmlFor={name} hasError={hasError}>
        {hasError && <Warning size="small" />}
        {`${hasError ? ' ' : ''}${help}`}
      </Text>
    )}
  </Styles.InputWrapper>
);

Input.propTypes = {
  /** It disables the input field. </i> */
  disabled: PropTypes.bool,
  /** It colors the field in red. */
  hasError: PropTypes.bool,
  /** It adds an help text below the input box. */
  help: PropTypes.string,
  /** It adds a label on top of the input box. */
  label: PropTypes.string,
  /** It's the name of the input. */
  name: PropTypes.string.isRequired,
  /** It's the placeholder value of the input. */
  placeholder: PropTypes.string,
  /** The onChange event */
  onChange: PropTypes.func.isRequired,
  /** This is the vertical size of the input field, can be `small`, `regular`, or `tall` */
  size: PropTypes.string,
  /** The type of the input */
  type: PropTypes.string,
  /** The value of the input */
  value: PropTypes.string
};

Input.defaultProps = {
  disabled: false,
  hasError: false,
  help: '',
  label: '',
  placeholder: '',
  size: 'regular',
  type: 'text',
  value: undefined
}

export default Input;
