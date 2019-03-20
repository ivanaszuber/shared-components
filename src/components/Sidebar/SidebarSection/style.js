import styled from 'styled-components'
import { fontSize, fontWeightBold } from '../../style/fonts'
import { grayLight, grayDarker } from '../../style/colors'

export const SidebarSectionStyled = styled.div`
  margin: 16px 0px;
`;

export const Header = styled.div`
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid ${grayLight};
  font-size: ${fontSize};
  font-weight: ${fontWeightBold};
  color: ${grayDarker};
`;
