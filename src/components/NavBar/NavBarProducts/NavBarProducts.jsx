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

const NavBarProduct = ({ activeProducts }) => {

  const hasPublish = activeProducts.includes('publish');
  const hasReply = activeProducts.includes('reply');
  // If the user has a Publish account then we redirect to 'http://analyze.buffer.com'
  // Analyze itself takes care of redirecting the user to the marketing page if needed.
  const hasAnalyze = hasPublish;

  return (
    <StlyedNavBarProduct>
      <ProductLink href={hasPublish ? 'https://publish.buffer.com': 'https://buffer.com/'}>
        <IconPublish verticalAlign="middle" />
        <ProductText>Publish</ProductText>
      </ProductLink>
      <ProductLink href={hasReply ? 'https://reply.buffer.com' : 'https://buffer.com/reply'}>
        <IconReply verticalAlign="middle" />
        <ProductText>Reply</ProductText>
      </ProductLink>
      <ProductLink href={hasAnalyze ? 'https://analyze.buffer.com' : 'https://buffer.com/analyze'}>
        <IconAnalyze verticalAlign="middle" />
        <ProductText>Analyze</ProductText>
      </ProductLink>
    </StlyedNavBarProduct>
  );
};

NavBarProduct.propTypes = {
  activeProducts: PropTypes.arrayOf(PropTypes.oneOf(['publish', 'analyze', 'reply'])),
};

NavBarProduct.defaultProps = {
  activeProducts: ['publish'],
};

export default NavBarProduct;
