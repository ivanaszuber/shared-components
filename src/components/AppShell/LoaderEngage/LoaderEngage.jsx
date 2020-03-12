import React from 'react';
import Loader from '../../Loader';

import {
  Wrapper,
  SidebarWrapper,
  ContentWrapper
} from './LoaderEngage.styles';

const LoaderEngage = () => (
  <Wrapper>
    <SidebarWrapper>
      <Loader />
    </SidebarWrapper>
    <ContentWrapper />
  </Wrapper>
);

export default LoaderEngage;