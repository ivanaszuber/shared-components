import React from 'react';
import PropTypes from 'prop-types';
import style from 'styled-components';


const CardWrapper = style.a`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: stretch;
    align-self: stretch;
    color: rgb(36, 42, 49);
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(116, 129, 141, 0.1) 0px 3px 8px 0px;
    margin: 0px;
    padding: 0px;
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(230, 236, 241);
    border-image: initial;
    transition: border 200ms ease 0s;
    text-decoration: none;
    cursor: pointer;
    &:hover {
       border-color: #2E5DF8;
       color: blue;
    }
`;

const CardBody = style.div`
  background: #ffffff;
  flex: 1;
  padding: 16px;
`;

const CardTitle = style.h3`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
`;


const LinkCard = ({ title, href }) => (
  <CardWrapper href={href}>
    <CardBody>
      <CardTitle>{title}</CardTitle>
    </CardBody>
  </CardWrapper>
);

LinkCard.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default LinkCard;
