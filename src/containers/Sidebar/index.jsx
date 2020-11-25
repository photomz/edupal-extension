import React, { useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Util from '../../util';
import atoms from '../../atoms';
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
  ${({ $, $isClosed }) =>
    $isClosed &&
    `overflow-x: hidden;
    width: ${$.spacing(7)}px;
    `}
  & > .MuiPaper-root {
    width: ${drawerWidth};
    border: 0;
  }
`;

const PullFab = styled(Fab)`
  ${({ theme: $ }) => `
    position: absolute;
    background-color: ${$.palette.common.white};
    &&&{right: ${$.spacing(-4) + drawerWidth};}
    top: ${$.spacing(12)};
    padding: 0 ${$.spacing(5)} 0 ${$.spacing(2)};
    transition: right ${$.transitions.duration.enteringScreen}ms ${
    $.transitions.easing.easeOut
  };`}
  ${({ theme: $, $isClosed }) =>
    $isClosed &&
    `&&&{right: ${$.spacing(-4)}};
      transition: right ${$.transitions.duration.leavingScreen}ms ${
      $.transitions.easing.sharp
    };
     `}
`;

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useRecoilState(atoms.isDrawerOpen);
  const isUploaderOpen = useRecoilValue(atoms.isUploaderOpen);
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {}, []);

  Util.useOutsideClick([drawerRef, hamburgerRef], isUploaderOpen, () =>
    setIsDrawerOpen(false)
  );

  return (
    <Wrapper>
      <PullFab
        size="large"
        ref={hamburgerRef}
        variant="extended"
        $isClosed={!isDrawerOpen}
        aria-label="Open sidebar"
        onClick={() => setIsDrawerOpen((prev) => !prev)}
      >
        <ChevronLeftIcon />
      </PullFab>
      <DrawerPaper
        ref={drawerRef}
        $isClosed={!isDrawerOpen}
        open={isDrawerOpen}
        anchor="right"
        variant="persistent"
      >
        <div id="edupal-questionPanel">
          <SidebarHead />
          <TabBar />
        </div>
      </DrawerPaper>
    </Wrapper>
  );
};

export default Sidebar;
