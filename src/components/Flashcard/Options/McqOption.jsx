import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import prop from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

const StyledAvatar = styled(Avatar)`
  ${({ $, colour }) => `
  
  margin: ${$.spacing(1)};
  background-color: ${$.palette[colour].main};
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: ${$.shadows[4]};
    background-color: ${$.palette[colour].dark};
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

const LetterFab = ({ i, handleRespond }) => {
  const $ = useTheme();
  return (
    <StyledAvatar
      $={$}
      colour={alphabet[i][1]}
      sizes="large"
      onClick={handleRespond}
    >
      {alphabet[i][0]}
    </StyledAvatar>
  );
};

LetterFab.propTypes = {
  i: prop.number.isRequired,
  handleRespond: prop.func.isRequired,
};

const TextOption = ({ i, text, handleRespond }) => {
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
      <LetterFab i={i} handleRespond={handleRespond} />
      <StyledPaper $={$} variant="outlined">
        <Typography>{text}</Typography>
      </StyledPaper>
    </Grid>
  );
};

TextOption.propTypes = {
  i: prop.number.isRequired,
  text: prop.oneOfType([prop.string, prop.number]).isRequired,
  handleRespond: prop.func.isRequired,
};

const McqOptions = ({ num, handleRespond }) => {
  const {
    meta: { optionNum, options },
  } = useRecoilValue(atoms.questions)[num];
  const hasOptionsText = options !== null;

  return (
    <Wrapper>
      <Grid container spacing={1} justify="center">
        {[...Array(optionNum)].map((_, i) =>
          hasOptionsText ? (
            <TextOption
              key={i}
              i={i}
              text={options[i]}
              handleRespond={handleRespond}
            />
          ) : (
            <LetterFab key={i} i={i} handleRespond={handleRespond} />
          )
        )}
      </Grid>
    </Wrapper>
  );
};

McqOptions.propTypes = {
  num: prop.number.isRequired,
  handleRespond: prop.func.isRequired,
};

export default McqOptions;
