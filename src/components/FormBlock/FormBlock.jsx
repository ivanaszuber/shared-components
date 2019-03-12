import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Styles from './style';

const FormBlockStyled = styled.div`
  ${Styles.FormBlockBase};
  ${props => props.withBackground && Styles.withBackground};
  ${props => props.withBorder && Styles.withBorder};
  ${props => props.inline && Styles.inline};
  ${props => Styles[props.align]};
  ${props => props.condensed && Styles.condensed};
`;

const FormBlock = ({
  align,
  inline,
  withBorder,
  withBackground,
  children,
  condensed
}) => (
  <FormBlockStyled
    align={align}
    inline={inline}
    withBorder={withBorder}
    withBackground={withBackground}
    condensed={condensed}
  >
    {children}
  </FormBlockStyled>
);

FormBlock.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center']),
  inline: PropTypes.bool,
  withBorder: PropTypes.bool,
  withBackground: PropTypes.bool,
  condensed: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

FormBlock.defaultProps = {
  align: 'center',
  inline: false,
  withBorder: false,
  withBackground: false,
  condensed: false,
  children: null
}

export default FormBlock;
