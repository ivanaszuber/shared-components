import styled from 'styled-components';

import { white, gray } from '../../style/colors';

export const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`;

export const SidebarWrapper = styled.aside`
  width: 100%;
  height: 100%;
  max-width: 470px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${white};
  border-right: 1px solid ${gray};
`;

export const ContentWrapper = styled.div`
  width: 552px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 0px;
  margin: 0 auto;
`;

export const PostWrapper = styled.div`
  background: ${white};
  border: 1px solid ${gray};
  border-radius: 4px;
  width: 100%;
  height: 100%;
`;