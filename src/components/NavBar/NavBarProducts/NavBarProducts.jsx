import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  grayLighter,
  grayDark,
  blueDarker
} from '../../style/colors';

import {
  fontWeightMedium,
  fontFamily
} from '../../style/fonts';

const StlyedNavBarProduct = styled.nav`
  display: flex;
  position: relative;
  z-index: 2;
`;

const ProductLink = styled.a`
  height: 100%;
  display: flex;
  color: #fff;
  padding: 0 24px;
  font-size: 16px;
  text-decoration: none;
  align-items: center;
  color: ${props => (props.active ? blueDarker : grayDark)};
  background-color: ${props => (props.active ? grayLighter : 'transparent')};
  &:hover {
    color: ${props => (props.active ? blueDarker : grayDark)};
    background-color: ${grayLighter};
  }
  & svg {
    filter: grayscale(1) contrast(.5);
    filter: ${props => (props.active ? 'grayscale(0) contrast(1)' : 'grayscale(1) contrast(.5)')};
  }
`;

const ProductText = styled.span`
  font-family: ${fontFamily};
  font-weight: ${fontWeightMedium};
  margin-left: 8px;
`;

// Notee: Custom SVGs to support multi-color product icons (instead of using icon component)
const PublishLogo = () => (
  <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path fillRule='evenodd' clipRule='evenodd' d='M6.38324 6.40009L10.3798 10.407V16.0001L0.771271 6.40009H6.38324Z' fill='#132062' />
    <path fillRule='evenodd' clipRule='evenodd' d='M16.9979 13.5234V0H3.47618L16.9979 13.5234Z' fill='#6B81FF' />
  </svg>
);

const ReplyLogo = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 9.03754H8.9274V16H16V9.03754Z" fill="#132062" />
    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H13.8055V6.94855H6.83673V13.911L0 13.925V0Z" fill="#FF9B6B" />
  </svg>
);

const AnalyzeLogo = () => (
  <svg width="19" height="20" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.1336 2.8703C3.28309 2.8703 0.167206 6.03021 0.167206 9.93515C0.167206 13.8401 3.28309 17 7.1336 17C10.9841 17 14.1 13.8401 14.1 9.93515H7.1336V2.8703Z" fill="#F3AFB9" />
    <path fillRule="evenodd" clipRule="evenodd" d="M16 8.00839C16 4.10346 12.8841 0.943542 9.0336 0.943542V8.00839H16Z" fill="#132062" />
  </svg>
);


const NavBarProduct = ({ activeProduct, onLoadProduct }) => (
  <StlyedNavBarProduct>
    <ProductLink
      active={activeProduct === 'publish'}
      href='https://publish.buffer.com'
      onClick={event => onLoadProduct(event, 'publish')}
    >
      <PublishLogo />
      <ProductText>Publish</ProductText>
    </ProductLink>
    <ProductLink
      active={activeProduct === 'reply'}
      href='https://reply.buffer.com'
      onClick={event => onLoadProduct(event, 'reply')}
    >
      <ReplyLogo />
      <ProductText>Reply</ProductText>
    </ProductLink>
    <ProductLink
      active={activeProduct === 'analyze'}
      href='https://analyze.buffer.com'
      onClick={event => onLoadProduct(event, 'analyze')}
    >
      <AnalyzeLogo />
      <ProductText>Analyze</ProductText>
    </ProductLink>
    <ProductLink
      active={activeProduct === 'engage'}
      href='http://localhost:8080/'
      onClick={event => onLoadProduct(event, 'engage')}
    >
      <AnalyzeLogo />
      <ProductText>Engage</ProductText>
    </ProductLink>
  </StlyedNavBarProduct>
);

NavBarProduct.propTypes = {
  activeProduct: PropTypes.oneOf(['publish', 'analyze', 'reply', 'engage']),
  onLoadProduct: PropTypes.func
};

NavBarProduct.defaultProps = {
  activeProduct: undefined,
  onLoadProduct: null
};

export default NavBarProduct;
