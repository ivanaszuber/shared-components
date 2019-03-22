import React from 'react';
import PropTypes from 'prop-types';
import { GlobalNotificationStyled } from './style';

const GlobalNotification = ({ children }) => (
  <GlobalNotificationStyled>
    {children}
  </GlobalNotificationStyled>
);

GlobalNotification.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

GlobalNotification.defaultProps = {
  children: null
};

export default GlobalNotification;