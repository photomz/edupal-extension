import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import MuiSpeedDial from '@material-ui/lab/SpeedDial';
import MuiSpeedDialAction from '@material-ui/lab/SpeedDialAction';
import MuiIcon from '@material-ui/core/Icon';

import EdupalSvg from '../../assets/images/edupal_icon.svg';

import g from '../../global';
import { role, isDrawerOpen, tabOrder } from '../../logic/common';
import { creatorType } from '../../logic/create';

const EdupalIcon = () => (
  <MuiIcon>
    <img src={EdupalSvg} height={52} width={50} alt="Edu-pal Icon" />
  </MuiIcon>
);

const Wrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing(12)}px;
  right: ${({ theme, $isOpen }) =>
    theme.spacing(4) + ($isOpen && g.drawerWidth)}px;
  transform: translateZ(0);
  flex-grow: 1;
  transition: right
    ${({ theme }) => theme.transitions.duration.enteringScreen}ms
    ${({ theme }) => theme.transitions.sharp};
`;

const SpeedDial = styled(MuiSpeedDial)`
  z-index: 99;
  & .MuiIcon-root {
    width: 1.5em;
    height: 1.5em;
  }
  & .MuiFab-root:hover {
    box-shadow: ${({ theme }) => theme.shadows[8]};
  }
`;

const ShortAppBar = React.forwardRef((_, ref) => {
  const [open, setOpen] = useRecoilState(isDrawerOpen);
  const userRole = useRecoilValue(role);
  const setQuestionType = useSetRecoilState(creatorType);
  const setTabs = useSetRecoilState(tabOrder);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const handleDialClick = (value) => {
    setSpeedDialOpen(false);
    setOpen(true);
    setQuestionType(value);
    setTabs(0);
  };

  return (
    <Wrapper $isOpen={open}>
      <SpeedDial
        ariaLabel="speed-dial"
        direction="down"
        icon={<EdupalIcon />}
        onClose={() => setSpeedDialOpen(false)}
        onOpen={() => setSpeedDialOpen(true)}
        onClick={() => setOpen(true)}
        open={speedDialOpen}
        ref={ref}
      >
        {userRole === 'TEACHER' &&
          Object.entries(g.questionTypes).map(([value, { name, Icon }]) => (
            <MuiSpeedDialAction
              key={name}
              icon={<Icon />}
              tooltipTitle={name}
              onClick={() => handleDialClick(value)}
            />
          ))}
      </SpeedDial>
    </Wrapper>
  );
});

export default ShortAppBar;
