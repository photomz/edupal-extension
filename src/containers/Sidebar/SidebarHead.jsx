import React from 'react';
import styled from 'styled-components';

import MuiContainer from '@material-ui/core/Container';

import logo from '../../assets/images/logo_words.svg';

const Image = styled.img`
  width: 250px;
  align-self: center;
  padding-left: ${({ theme }) => theme.spacing(4)}px;
`;

const Flex = styled(MuiContainer)`
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin: ${({ theme }) => theme.spacing(4)}px;
`;

const SidebarHead = () => (
  <Flex>
    <a href="www.edu-pal.org">
      <Image src={logo} />
    </a>
  </Flex>
);

export default SidebarHead;
