import React from 'react';
import styled from 'styled-components';

import MuiContainer from '@material-ui/core/Container';
import MuiTooltip from '@material-ui/core/Tooltip';

import HelpIcon from '@material-ui/icons/Help';
import MuiIconButton from '@material-ui/core/IconButton';

import logo from '../../assets/images/logo_shortened.png';

const Image = styled.img`
  width: 250px;
  align-self: center;
  padding-left: ${({ theme }) => theme.spacing(8)}px;
`;

const Flex = styled(MuiContainer)`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin: ${({ theme }) => theme.spacing(1)}px;
`;

const IconButton = styled(MuiIconButton)`
  position: absolute;
  top: 0;
  right: ${({ theme }) => theme.spacing(2)}px; ;
`;

const SidebarHead = () => (
  <Flex>
    <Image
      src={logo}
      onClick={() => {
        window.open('https://www.edu-pal.org');
      }}
    />
    <MuiTooltip title="Help">
      <IconButton
        onClick={() => {
          window.open('https://www.edu-pal.org/faq#faq');
        }}
      >
        <HelpIcon />
      </IconButton>
    </MuiTooltip>
  </Flex>
);

export default SidebarHead;
