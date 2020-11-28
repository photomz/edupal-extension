import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Icon from '@material-ui/core/Icon';

import RadioIcon from '@material-ui/icons/RadioButtonChecked';
import CheckIcon from '@material-ui/icons/CheckBox';
import TrueFalseIcon from '@material-ui/icons/Beenhere';
import ParagraphICon from '@material-ui/icons/ViewHeadline';
import EdupalSvg from '../../assets/images/edupal_icon.svg';

import a from '../../atoms';

const drawerWidth = 400;

const EdupalIcon = () => (
  <Icon>
    <img src={EdupalSvg} height={52} width={50} alt="Edu-pal Icon" />
  </Icon>
);

const Wrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing(12)};
  right: ${({ theme, $isClosed }) =>
    theme.spacing(4) + (!$isClosed && drawerWidth)};
  transform: translateZ(0);
  flex-grow: 1;
  transition: right
    ${({ theme }) => theme.transitions.duration.enteringScreen}ms
    ${({ theme }) => theme.transitions.sharp};
`;

const StyledSpeedDial = styled(SpeedDial)`
  & .MuiIcon-root {
    width: 1.5em;
    height: 1.5em;
  }
  & .MuiFab-root:hover {
    box-shadow: ${({ theme }) => theme.shadows[8]};
  }
`;

const actions = [
  { icon: <RadioIcon />, name: 'Multiple Choice', value: 'MCQ' },
  { icon: <CheckIcon />, name: 'Multi-Select', value: 'MultiSelect' },
  { icon: <TrueFalseIcon />, name: 'True or False', value: 'TrueFalse' },
  { icon: <ParagraphICon />, name: 'Short Answer', value: 'ShortAnswer' },
];

const ShortAppBar = React.forwardRef((_, ref) => {
  const [isDrawerOpen, setIsDrawerOpen] = useRecoilState(a.isDrawerOpen);
  const role = useRecoilValue(a.role);
  const setQuestionType = useSetRecoilState(a.creatorType);
  const [open, setOpen] = useState(false);

  const handleDialClick = (value) => {
    setOpen(false);
    setIsDrawerOpen(true);
    setQuestionType(value);
  };

  return (
    <Wrapper $isClosed={!isDrawerOpen}>
      <StyledSpeedDial
        ariaLabel="speed-dial"
        direction="down"
        icon={<EdupalIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        onClick={() => console.log('Click') && setIsDrawerOpen(true)}
        open={open}
        ref={ref}
      >
        {role === 'TEACHER' &&
          actions.map(({ name, icon, value }) => (
            <SpeedDialAction
              key={name}
              icon={icon}
              tooltipTitle={name}
              onClick={() => handleDialClick(value)}
            />
          ))}
      </StyledSpeedDial>
    </Wrapper>
  );
});

export default ShortAppBar;
