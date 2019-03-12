import styled from 'styled-components';
import {
  grayDarker,
  grayDark,
  red,
} from '../style/colors';
import {
  fontFamily,
  fontSize,
  fontWeight,
  fontWeightBold,
  fontWeightMedium,
  lineHeight,
  lineHeightNormal,
} from '../style/fonts';

export const Span = styled.span`
  color: inherit;
  font-family: ${fontFamily};
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
`;

export const Paragraph = styled.p`
  color: ${grayDarker};
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
  line-height: 20px;
`;

export const H1 = styled.h1`
  color: ${grayDarker};
  font-family: ${fontFamily};
  font-size: 32px;
  font-weight: ${fontWeightBold};
  line-height: 44px;
`;

export const H2 = styled.h2`
  color: ${grayDarker};
  font-family: ${fontFamily};
  font-size: 24px;
  font-weight: ${fontWeightBold};
  line-height: 34px;
`;

export const H3 = styled.h3`
  color: ${grayDarker};
  font-family: ${fontFamily};
  font-size: 18px;
  font-weight: ${fontWeightBold};
  line-height: 28px;
`;

export const Label = styled.label`
  color: ${({ light }) => light ? grayDark : grayDarker };
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeightMedium};
  line-height: ${lineHeight};
`;

export const Help = styled.label`
  color: ${({ hasError }) => hasError ? red : grayDarker };
  font-family: ${fontFamily};
  font-size: 12px;
  font-weight: ${fontWeightMedium};
  line-height: ${lineHeightNormal};
`;

