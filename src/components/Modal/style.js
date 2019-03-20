/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';
import {
  white,
} from '../style/colors';
import { borderRadius } from '../style/borders';

export const Container = styled.div`
  background: rgba(0, 0, 0, .4);
  display: flex;
  height: 100%;
  align-items: center;
  position: absolute;
  padding-top: 80px;
  box-sizing: border-box;
  width: 100%;
  z-index: 9999;
  flex-direction: column;
  top: 0px;
  left: 0px;
`;

export const Modal = styled.section`
  background: ${props => props.background};
  background-color: ${white};
  background-size: 100% auto;
  border-radius: ${borderRadius};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
  box-sizing: border-box;
  margin: 0 0 1rem;
  padding: 16px 0 16px 0;
  width: ${props => props.wide ? '730px': '512px' };
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 0;
`;

export const Footer = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${white};
  padding: 0 16px;
  margin-top: 16px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > span,
  & > p {
    margin:  0 auto 0 0;
  }
`;

