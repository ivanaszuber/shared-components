import styled from 'styled-components';
import {
  gray, grayDark, grayLight, white,
} from '../../style/colors';
import { fontSize, fontWeightMedium } from '../../style/fonts';

export const NavBarStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${grayDark};
  padding: 0px 16px;
  height: 64px;
  width: 230px;
`;

export const NavBarUser = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  overflow: hidden;
  margin-right: 20px;
`;

export const NavBarAvatar = styled.div`
  border-radius: 100px;
  width: 60px;
  height: 40px;
  background: ${gray};
  cursor: pointer;
  background-size: cover;
  background-image: url(${props => (props.avatar)});
`;

export const NavBarName = styled.div`
  font-size: 16px;
  color: ${white};
  font-weight: ${fontWeightMedium};
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const NavBarEmail = styled.div`
  font-size: ${fontSize};
  color: ${grayLight};
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const NavBarChavron = styled.div`
  background: #3D3D3D;
  border: 1px solid #3D3D3D;
  box-sizing: border-box;
  border-radius: 4px;
  color: ${gray};
  height: 16px;
  width: 16px;
  display: flex;
  align-items: center;
  position: relative;
  left: -8px;
  cursor: pointer;
`;
