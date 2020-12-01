import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import MuiDrawer from '@material-ui/core/Drawer';

import TabBar from './TabBar';
import SidebarHead from './SidebarHead';
import { isDrawerOpen } from '../../logic/common';

const drawerWidth = 400;

const Drawer = styled(MuiDrawer)`
  ${({ theme: $ }) => `
    position: absolute;
    right: ${$.spacing(0)}px;
    width: ${drawerWidth}px;
    margin: 0 auto;
    transition: ${$.transitions.create('width')};
    border: 0;
    `}
  ${({ theme: $, $isClosed }) =>
    $isClosed &&
    `overflow-x: hidden;
    width: ${$.spacing(7)}px;
    `}
  & > .MuiPaper-root {
    width: ${drawerWidth}px;
    border: 0;
    overflow-x: hidden;
  }
`;
const Sidebar = React.forwardRef((_, ref) => {
  const open = useRecoilValue(isDrawerOpen);

  return (
    <Drawer
      ref={ref}
      $isClosed={!open}
      open={open}
      anchor="right"
      variant="persistent"
    >
      <SidebarHead />
      <TabBar />
    </Drawer>
  );
});

export default Sidebar;
