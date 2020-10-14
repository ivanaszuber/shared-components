/* eslint-disable no-confusing-arrow */
import style, { css } from 'styled-components';
import {
  grayDarker,
  blue,
  blueDark,
  blueLighter,
  white,
  grayDark,
  gray,
  grayDefault,
  boxShadow,
  grayLight,
  orangeDark,
  orange as orangeColor,
} from '../style/colors';
import {
  fontFamily,
  fontSize,
  lineHeight,
  fontWeightMedium,
} from '../style/fonts';
import { borderRadius } from '../style/borders';
import { ButtonStyled } from './Button';

export const ButtonWrapperBase = css`
  -webkit-appearance: none;
  align-items: center;
  background-color: ${white};
  border: 0;
  border-radius: ${borderRadius};
  box-sizing: border-box;
  color: ${grayDefault};
  cursor: pointer;
  display: inline-block;
  justify-content: flex-start;
  flex: 0 0 auto;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeightMedium};
  line-height: ${lineHeight};
  min-width: 0;
  padding-top: 0;
  padding-bottom: 0;
  position: relative;
  transition-property: background-color, border-color, color;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  user-select: none;

  :active {
    top: 1px;
  }
  :focus {
    box-shadow: 0 0 0 3px ${boxShadow};
    outline: 0;
  }
  :hover {
    transition-property: background-color, border-color, color;
    transition-duration: 0.1s;
    transition-timing-function: ease-in;
  }
`;

export const ButtonContainerBase = css`
  -webkit-appearance: none;
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  flex: 0 0 auto;
  user-select: none;
  width: 100%;
  height: 100%;
`;

export const ButtonNestedBase = css`
  align-items: center;
  background: none transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  justify-content: flex-start;
  margin: -1px;
  padding: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

/* styles common to all buttons */
export const ButtonBase = css`
  -webkit-appearance: none;
  align-items: center;
  background-color: ${white};
  border: 0;
  border-radius: ${borderRadius};
  color: ${grayDefault};
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  flex: 0 0 auto;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeightMedium};
  line-height: ${lineHeight};
  min-width: 0;
  padding-top: 0;
  padding-bottom: 0;
  position: relative;
  transition-property: background-color, border-color, color;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  user-select: none;
  :active {
    top: 1px;
  }
  :focus {
    box-shadow: 0 0 0 3px ${boxShadow};
  }
  :hover {
    transition-property: background-color, border-color, color;
    transition-duration: 0.1s;
    transition-timing-function: ease-in;
  }
`;

/* theme variants */
export const primary = css`
  background-color: ${blue};
  color: ${white};
  border: 1px solid ${blue};
  :hover {
    background-color: ${blueDark};
    border-color: ${blueDark};
    color: ${white};
  }
`;
export const secondary = css`
  background-color: ${white};
  color: ${grayDark};
  border: 1px solid ${gray};

  :hover {
    color: ${grayDarker};
    border-color: ${grayDark};
  }

  :focus {
    border-color: ${blue};
    color: ${grayDarker};
  }
`;
export const link = css`
  background-color: transparent;
  color: ${blue};
  :hover {
    color: ${blueDark};
  }
`;
export const text = css`
  background-color: transparent;
  :hover {
    color: ${grayDarker};
  }
`;

export const orange = css`
  background-color: ${orangeDark};
  color: ${white};
  border: 1px solid ${orangeDark};
  :hover {
    background-color: ${orangeColor};
    border-color: ${orangeColor};
    color: ${white};
  }
`;

/* size variants */
export const small = css`
  padding-left: 8px;
  padding-right: 8px;
  height: 32px;
`;
export const medium = css`
  padding-right: 16px;
  padding-left: 16px;
  height: 40px;
`;
export const large = css`
  padding-right: 16px;
  padding-left: 16px;
  height: 48px;
`;

/* state variants */
export const disabled = css`
  background-color: ${grayLight};
  cursor: not-allowed;
  border: 1px solid ${grayLight};
`;

export const fullWidth = css`
  width: 100%;
  justify-content: center;
`;

export const ButtonSelect = style.div`
  :before {
    background-color: ${props => (props.disabled ? gray : blueLighter)};
    color: ${props => (props.disabled ? gray : blueLighter)};
    content: "";
    height: 24px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
  }

  align-items: center;
  display: flex;
  height: 38px;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 10px;
  position: relative;
  width: 100%;

  ${ButtonStyled}:hover & {
    background-color: ${blueDark};
    color: ${white};
  }
  ${ButtonStyled}:focus & {
    border-color: ${blue};
      color: ${grayDarker};
  }
`;

export const ButtonArrow = style.div`
  padding-left: 5px;
  display: flex;
  margin-right: -4px;
`;

export const ButtonLabel = style.div`
  margin-left: ${props => (props.hasIcon && !props.iconEnd ? '5px' : '0px')};
  margin-right: ${props => (props.hasIcon && props.iconEnd ? '5px' : '0px')};
`;
