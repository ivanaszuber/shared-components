import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../NavBar';

import { AppShellStyled, Wrapper, SidebarWrapper, ContentWrapper } from './style';

/**
 * The AppShell component is a general purpose wrapper for all of our applications.
 */
const AppShell = ({ user, activeProduct, sidebar: SidebarComponent, content: ContentComponent }) => (
  <AppShellStyled>
    <NavBar user={user} activeProduct={activeProduct} />
    <Wrapper>
      <SidebarWrapper>
        <SidebarComponent />
      </SidebarWrapper>
      <ContentWrapper>
        <ContentComponent />
      </ContentWrapper>
    </Wrapper>
  </AppShellStyled>
);

AppShell.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.node,
      hasDivider: PropTypes.bool,
      onItemClick: PropTypes.func,
    })),
  }).isRequired,
  activeProduct: PropTypes.oneOf(['publish', 'analyze', 'reply']),
  sidebar: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
};

AppShell.defaultProps = {
  activeProduct: 'publish'
};

export default AppShell;
