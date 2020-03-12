import React, { useState } from 'react';
import PropTypes from 'prop-types';

import NavBar from '../NavBar';
import Banner from '../Banner';
import LoaderEngage from './LoaderEngage/LoaderEngage';
// import GlobalStyles from '../GlobalStyles';

import {
  AppShellStyled,
  Wrapper,
  SidebarWrapper,
  ContentWrapper,
} from './style';

/**
 * The AppShell component is a general purpose wrapper for all of our applications. At the moment it's primarily a wrapper for the `NavBar` component. Check out the example below to see how to integrate it into your app.
 */
const AppShell = ({
  activeProduct,
  user,
  helpMenuItems,
  sidebar,
  content,
  bannerOptions,
  onLogout,
}) => {

  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const onLoading = product => {
    setSelectedProduct(product);
    setLoading(true);

    let href = 'https://publish.buffer.com';
    if (product === 'reply') href = 'https://reply.buffer.com';
    if (product === 'analyze') href = 'https://analyze.buffer.com';
    if (product === 'engage') href = 'http://localhost:8080';
    window.location = href;
  }

  return (
    <AppShellStyled>
      {/* <GlobalStyles /> */}
      <NavBar
        activeProduct={activeProduct}
        user={user}
        helpMenuItems={helpMenuItems}
        onLogout={onLogout}
        onLoading={onLoading}
      />
      {bannerOptions && (
        <Banner
          {...bannerOptions}
        />
      )}
      <Wrapper>
        {sidebar && <SidebarWrapper>{sidebar}</SidebarWrapper>}
        <ContentWrapper>
          {loading && selectedProduct === 'engage' ? <LoaderEngage /> : content}
        </ContentWrapper>
      </Wrapper>
    </AppShellStyled>
  );
};

AppShell.propTypes = {
  /** The currently active (highlighted) product in the `NavBar`, one of `'publish', 'reply', 'analyze'` */
  activeProduct: PropTypes.oneOf(['publish', 'reply', 'analyze']),

  /** The current user object */
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    /** If missing we will use Gravatar to get the user avatar by email */
    avatar: PropTypes.string,
    /** If missing we will use Gravatar to get the user avatar by email */
    ignoreMenuItems: PropTypes.arrayOf(PropTypes.string),
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        component: PropTypes.func,
        hasDivider: PropTypes.bool,
        onItemClick: PropTypes.func,
      })
    ).isRequired,
  }).isRequired,

  /** Menu items to show in the help menu */
  helpMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.node,
      hasDivider: PropTypes.bool,
      onItemClick: PropTypes.func,
    })
  ),

  /** (Optional) Your sidebar component. */
  sidebar: PropTypes.node,

  /** Your content component. */
  content: PropTypes.node.isRequired,

  /** (Optional) Content of banner displayed below the navbar */
  bannerOptions: PropTypes.shape({
    text: PropTypes.string,
    actionButton: PropTypes.shape({
      label: PropTypes.string,
      action: PropTypes.func,
    }),
    customHTML: PropTypes.shape({ __html: PropTypes.string }),
  }),

  /** (Optional) Callback to be called before logout */
  onLogout: PropTypes.func,
};

AppShell.defaultProps = {
  sidebar: null,
  activeProduct: undefined,
  bannerOptions: null,
  onLogout: undefined,
  helpMenuItems: null,
};

export default AppShell;
