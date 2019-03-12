import { css } from 'styled-components';
import { grayLight, grayLighter } from '../style/colors';

export const FormBlockBase = css`
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`;

export const withBackground = css`
  background-color: ${grayLighter};
`;

export const withBorder = css`
  border-bottom: 1px solid ${grayLight};
`;

export const inline = css`
  flex-direction: row;
`;

export const center = css`
  justify-content: center;
`;

export const left = css`
  justify-content: flex-start;
`;

export const right = css`
  justify-content: flex-end;
`;

export const condensed = css`
  padding: 8px 16px;
`;
