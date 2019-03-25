import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { grayDarker } from '../style/colors';
import Select from '../Select';

import BufferLogo from './BufferLogo';
import NavBarMenu from './NavBarMenu/NavBarMenu';
import NavBarProducts from './NavBarProducts/NavBarProducts';


const NavBarStyled = styled.nav`
  height: 64px;
  width: 100vw;
  background: ${grayDarker};
  display: flex;
  justify-content: space-between;
`;

const NavBarLeft = styled.div`
  display: flex;
`;
const NavBarRight = styled.div`
  display: flex;
`;

/**
 * The NavBar is not generally consumed alone, but instead used by the AppShell component. (This page is WIP. Examples coming soon.)
 */
const NavBar = ({ user, activeProducts }) => (
  <NavBarStyled>
    <NavBarLeft>
      <BufferLogo />
      <NavBarProducts activeProducts={activeProducts} />
    </NavBarLeft>
    <NavBarRight>
      {user.menuItems && (
        <Select
          horizontalOffset="-16px"
          customButton={handleClick => (<NavBarMenu user={user} onClick={handleClick} />)}
          items={user.menuItems}
        />
      )}
    </NavBarRight>
  </NavBarStyled>
);

NavBar.propTypes = {
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
  activeProducts: PropTypes.arrayOf(PropTypes.oneOf(['publish', 'analyze', 'reply'])),
};

NavBar.defaultProps = {
  activeProducts: ['publish']
};

export default NavBar;
