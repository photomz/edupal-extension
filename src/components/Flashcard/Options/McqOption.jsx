/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import prop from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import atoms from '../../../atoms';

const Wrapper = styled.div`
  flex-grow: 1;
`;

const alphabet = [
  ['A', 'primary'],
  ['B', 'red'],
  ['C', 'green'],
  ['D', 'secondary'],
  ['E', 'yellow'],
];

const StyledFab = styled(Fab)`
  ${({ $, colour }) => `
  margin: ${$.spacing(2)} ${$.spacing(4)};
  background-color: ${$.palette[colour].main};
  &&&:hover {
    background-color: ${$.palette[colour].dark};
  }
  &&&& p {
    color: ${$.palette.common.white} !important;
  }
  `}
`;

const StyledAvatar = styled(Avatar)`
  ${({ $, colour }) => `
  
  margin: ${$.spacing(1)};
  background-color: ${$.palette[colour].main};
  &&&:hover {
    background-color: ${$.palette[colour].dark};
    box-shadow: ${$.shadows[4]};
  }
  color: ${$.palette.common.white};
  font-weight: ${$.typography.fontWeightMedium};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
`}
`;

const StyledPaper = styled(Paper)`
  ${({ $ }) => ` 
  border-width: 2px;
  padding: ${$.spacing(1)} ${$.spacing(2)};
  margin: 0 ${$.spacing(1)};
  flex-grow: 10;
  `}
`;

const TextOption = ({ i, text }) => {
  const $ = useTheme();

  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <StyledAvatar $={$} colour={alphabet[i][1]} sizes="large">
        {alphabet[i][0]}
      </StyledAvatar>
      <StyledPaper $={$} variant="outlined">
        <Typography>{text}</Typography>
      </StyledPaper>
    </Grid>
  );
};

const InlineOption = ({ i }) => {
  const $ = useTheme();
  return (
    <StyledAvatar $={$} colour={alphabet[i][1]} sizes="large">
      {alphabet[i][0]}
    </StyledAvatar>
  );
};

const McqOptions = ({ num }) => {
  const {
    meta: { optionNum, options },
  } = useRecoilValue(atoms.questions)[num];
  const hasOptionsText = options !== null;

  return (
    <Wrapper>
      <Grid container spacing={1} justify="center">
        {[...Array(optionNum)].map((_, i) =>
          hasOptionsText ? (
            <TextOption key={i} i={i} text={options[i]} />
          ) : (
            <InlineOption key={i} i={i} />
          )
        )}
      </Grid>
    </Wrapper>
  );
};

McqOptions.propTypes = {
  num: prop.number.isRequired,
};

export default McqOptions;
