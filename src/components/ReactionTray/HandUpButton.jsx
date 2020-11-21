import React from 'react';
import styled from 'styled-components';
import shortid from 'shortid';

const TrayButton = styled.a`
  display: flex;
  overflow: visible !important;
  padding: 0 10px;
`;

const TrayButtonWrapper = styled.div`
  &:focus > ${TrayButton} {
    background-color: rgba(2, 191, 165, 0.15);
  }
`;

const HandUpButton = (tone) => {};
