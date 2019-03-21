/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { grayDarker, gray, grayLight } from '../../style/colors';
import { fontFamily, fontWeightMedium, fontSize } from '../../style/fonts';

export const SelectItemStyled = styled.li`
  min-height: 32px;
  align-items: center;
  color: ${grayDarker};
  cursor: pointer;
  display: flex;
  font-size: ${fontSize};
  font-family: ${fontFamily};
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  white-space: nowrap;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 4px;
  background-color: ${props => (props.hovered ? grayLight : 'transparent')};
  &:hover {
    background-color: ${grayLight};
  }
`;

export const SelectItemLabel = styled.div`
  font-size: ${fontSize};
  font-weight: ${fontWeightMedium};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  padding-left: ${props =>
    props.hasSearch && !props.hasSelectedItems && !props.hasComponent
      ? '32px'
      : '8px'};
  padding-right: 8px;
  display: flex;
  align-items: center;
`;

export const SelectItemIcon = styled.div`
  display: flex;
  padding-right: 8px;
  svg {
    fill: ${props => (props.hovered ? grayDarker : gray)};
  }
  ${SelectItemStyled}:hover & * {
    color: ${grayDarker};
    fill: ${grayDarker};
  }
`;

export const SelectItemTitle = styled.div`
  margin-left: ${props => (props.moveRight ? '24px' : '0px')};
`;

export const SelectItemCustom = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckIconWrapper = styled.div`
  margin-right: 8px;
  display: flex;
`;
