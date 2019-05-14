import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Publish as IconPublish,
  Analyze as IconAnalyze,
  Reply as IconReply,
} from '../../Icon';

import { gray } from '../../style/colors';
import { fontWeightMedium } from '../../style/fonts';

const StlyedNavBarProduct = styled.nav`
  display: flex;
  margin-left: 20px;
`;

const ProductLink = styled.a`
  height: 64px;
  display: flex;
  color: #fff;
  padding: 0 20px;
  font-size: 16px;
  font-weight: ${fontWeightMedium};
  text-decoration: none;
  align-items: center;
  color: ${props => (props.active ? '#fff' : gray)};
  &:hover {
    color: #fff;
  }
`;

const ProductText = styled.span`
  margin-left: 8px;
`;

const NavBarProduct = ({ activeProduct }) => (
  <StlyedNavBarProduct>
    <ProductLink
      active={activeProduct === 'publish'}
      href={activeProduct !== 'publish' ? 'https://publish.buffer.com' : '#'}
    >
      <IconPublish />
      <ProductText>Publish</ProductText>
    </ProductLink>
    <ProductLink
      active={activeProduct === 'reply'}
      href={activeProduct !== 'reply' ? 'https://reply.buffer.com' : '#'}
    >
      <IconReply />
      <ProductText>Reply</ProductText>
    </ProductLink>
    <ProductLink
      active={activeProduct === 'analyze'}
      href={activeProduct !== 'analyze' ? 'https://analyze.buffer.com' : '#'}
    >
      <IconAnalyze />
      <ProductText>Analyze</ProductText>
    </ProductLink>
  </StlyedNavBarProduct>
);

NavBarProduct.propTypes = {
  activeProduct: PropTypes.oneOf(['publish', 'analyze', 'reply']),
};

NavBarProduct.defaultProps = {
  activeProduct: undefined,
};

export default NavBarProduct;
