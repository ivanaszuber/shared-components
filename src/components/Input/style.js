import styled from 'styled-components';
import {
  blue,
  gray,
  grayLight,
  grayDarker,
  grayDark,
  red,
  redLight,
  white,
} from '../style/colors';
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from '../style/fonts';
import Text from '../Text';

export const InputStyled = styled.input`
  box-sizing: border-box;
  background: ${ ({ hasError }) => hasError ? redLight : white };
  border-radius: 4px;
  border: 1px solid ${ ({ hasError }) => hasError ? red : grayLight };
  box-shadow: 2px 2px 0 2px transparent;
  transition-property: border-width, border-color, box-shadow;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  color: ${ ({ hasError }) => hasError ? red : grayDarker };
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
  line-height: ${lineHeight};
  padding: ${ ({ size }) => {
    switch(size) {
      case 'small':
        return '5px 8px 4px 8px';
      case 'tall':
        return '13px 16px 12px 16px';
      default:
        return '9px 8px 8px 8px';
    }
  }};
  width: 100%;

  &::placeholder {
    color: ${gray};
  }

  &:focus {
    border: 1px solid ${ ({ hasError }) => hasError ? red : blue };
    box-shadow: 0px 0px 0px 3px ${ ({ hasError }) => hasError ? "#F3AFB9" : "#ABB7FF" };
    outline: none;
    transition-property: border-width, border-color, box-shadow;
    transition-duration: 0.1s;
    transition-timing-function: ease-in;
  }

  &:disabled {
    background: ${grayLight};
    border: 1px solid ${grayLight};
    color: ${grayDark};
    cursor: not-allowed;

    &::placeholder {
      color: ${gray};
    }
  }
`;

export const HelpTextWrapper = styled.div`
  display: flex;
  display: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;
  color: ${red};
`;

export const HelpText = styled(Text)`
  margin-left: ${props => props.hasError ? '4px' : '0px'};
`;