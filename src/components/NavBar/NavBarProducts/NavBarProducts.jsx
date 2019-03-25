import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconPublish from '../../Icon/Icons/Plus';
import IconAnalyze from '../../Icon/Icons/Compare';
import IconReply from '../../Icon/Icons/Message';

import { gray } from '../../style/colors';
import { fontWeightMedium } from '../../style/fonts';

const StlyedNavBarProduct = styled.nav`
  display: flex;
  margin-left: 20px;
`;

const ProductLink = styled.a`
  display: block;
  color: #fff;
  padding: 0 20px;
  font-size: 16px;
  font-weight: ${fontWeightMedium};
  text-decoration: none;
  align-self: center;
  color: ${props => (props.active ? '#fff' : gray)};
  &:hover {
    color: #fff;
  }
`;

const ProductText = styled.span`
  margin-left: 8px;
  vertical-align: middle;
`;

const NavBarProduct = ({ activeProducts }) => (
  <StlyedNavBarProduct>
    <ProductLink active={activeProducts.includes('publish')} href='https://publish.buffer.com'>
      <IconPublish verticalAlign="middle" />
      <ProductText>Publish</ProductText>
    </ProductLink>
    <ProductLink active={activeProducts.includes('reply')} href='https://reply.buffer.com'>
      <IconReply verticalAlign="middle" />
      <ProductText>Reply</ProductText>
    </ProductLink>
    <ProductLink active={activeProducts.includes('analyze')} href='https://analyze.buffer.com'>
      <IconAnalyze verticalAlign="middle" />
      <ProductText>Analyze</ProductText>
    </ProductLink>
  </StlyedNavBarProduct>
);

NavBarProduct.propTypes = {
  activeProducts: PropTypes.arrayOf(PropTypes.oneOf(['publish', 'analyze', 'reply'])),
};

NavBarProduct.defaultProps = {
  activeProducts: ['publish'],
};

export default NavBarProduct;
