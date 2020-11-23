import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Util from '../../util';
import atoms from '../../atoms';
import TabBar from './TabBar';
import SidebarHead from './SidebarHead';

const drawerWidth = 400;

const Wrapper = styled.div``;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'absolute',
    right: theme.spacing(0),
    width: drawerWidth,
    margin: '0 auto',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    border: 0,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  fab: {
    position: 'absolute',
    backgroundColor: theme.palette.common.white,
    top: theme.spacing(12),
    right: theme.spacing(-4) + drawerWidth,
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fabClose: {
    right: theme.spacing(-4),
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const Sidebar = () => {
  const c = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useRecoilState(atoms.isDrawerOpen);
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);

  Util.useOutsideClick([drawerRef, hamburgerRef], () => setIsDrawerOpen(false));

  return (
    <Wrapper>
      <Fab
        size="large"
        ref={hamburgerRef}
        variant="extended"
        className={clsx(c.fab, !isDrawerOpen && c.fabClose)}
        aria-label="open drawer"
        onClick={() => setIsDrawerOpen((prev) => !prev)}
      >
        <ChevronLeftIcon />
      </Fab>
      <Drawer
        ref={drawerRef}
        classes={{
          paper: clsx(c.drawerPaper, !isDrawerOpen && c.drawerPaperClose),
        }}
        open={isDrawerOpen}
        anchor="right"
        variant="persistent"
      >
        <SidebarHead />
        <TabBar />
      </Drawer>
    </Wrapper>
  );
};

export default Sidebar;
