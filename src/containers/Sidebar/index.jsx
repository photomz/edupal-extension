import React, { useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Drawer from '@material-ui/core/Drawer';

import Util from '../../util';
import a from '../../atoms';
import TabBar from './TabBar';
import SidebarHead from './SidebarHead';

const drawerWidth = 400;

const Wrapper = styled.div``;

const DrawerPaper = styled(Drawer)`
  ${({ theme: $ }) => `
    position: absolute;
    right: ${$.spacing(0)};
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
    width: ${drawerWidth};
    border: 0;
    overflow-x: hidden;
  }
`;
const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useRecoilState(a.isDrawerOpen);
  const isUploaderOpen = useRecoilValue(a.isUploaderOpen);
  const drawerRef = useRef(null);
  useEffect(() => {}, []);

  Util.useOutsideClick([drawerRef], isUploaderOpen, () =>
    setIsDrawerOpen(false)
  );

  return (
    <Wrapper>
      <DrawerPaper
        ref={drawerRef}
        $isClosed={!isDrawerOpen}
        open={isDrawerOpen}
        anchor="right"
        variant="persistent"
      >
        <SidebarHead />
        <TabBar />
      </DrawerPaper>
    </Wrapper>
  );
};

export default Sidebar;
