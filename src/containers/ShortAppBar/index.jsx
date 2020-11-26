/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Icon from '@material-ui/core/Icon';

import RadioIcon from '@material-ui/icons/RadioButtonChecked';
import CheckIcon from '@material-ui/icons/CheckBox';
import TrueFalseIcon from '@material-ui/icons/Beenhere';
import ParagraphICon from '@material-ui/icons/ViewHeadline';
import EdupalSvg from '../../assets/images/edupal_icon.svg';

import atoms from '../../atoms';

const drawerWidth = 400;

const StyledImg = styled.img`
  /* color: ${({ theme }) => theme.palette.primary.main}; */
`;
const EdupalIcon = () => (
  <Icon>
    <StyledImg src={EdupalSvg} height={52} width={50} />
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
`;

const actions = [
  { icon: <RadioIcon />, name: 'Multiple Choice', value: 'MCQ' },
  { icon: <CheckIcon />, name: 'Multi-Select', value: 'MultiSelect' },
  { icon: <TrueFalseIcon />, name: 'True or False', value: 'TrueFalse' },
  { icon: <ParagraphICon />, name: 'Short Answer', value: 'ShortAnswer' },
];

const ShortAppBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useRecoilState(atoms.isDrawerOpen);
  const setQuestionType = useSetRecoilState(atoms.questionType);
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
        onClick={() => setIsDrawerOpen(true)}
        open={open}
      >
        {actions.map(({ name, icon, value }) => (
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
};

export default ShortAppBar;

// import React from 'react';
// import { useRecoilState } from 'recoil';
// import styled from 'styled-components';
// import Fab from '@material-ui/core/Fab';

// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// import atoms from '../../atoms';

// const drawerWidth = 400;

// const PullFab = styled(Fab)`
//   ${({ theme: $ }) => `
//     position: absolute;
//     background-color: ${$.palette.common.white};
//     &&&{right: ${$.spacing(-4) + drawerWidth};}
//     top: ${$.spacing(12)};
//     padding: 0 ${$.spacing(5)} 0 ${$.spacing(2)};
//     transition: right ${$.transitions.duration.enteringScreen}ms ${
//     $.transitions.easing.easeOut
//   };`}
//   ${({ theme: $, $isClosed }) =>
//     $isClosed &&
//     `&&&{right: ${$.spacing(-4)}};
//       transition: right ${$.transitions.duration.leavingScreen}ms ${
//       $.transitions.easing.sharp
//     };
//      `}
// `;

// const Sidebar = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useRecoilState(atoms.isDrawerOpen);

//   return (
//     <PullFab
//       size="large"
//       variant="extended"
//       $isClosed={!isDrawerOpen}
//       aria-label="Open sidebar"
//       onClick={() => setIsDrawerOpen((prev) => !prev)}
//     >
//       <ChevronLeftIcon />
//     </PullFab>
//   );
// };

// export default Sidebar;
