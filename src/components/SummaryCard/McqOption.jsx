import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import prop from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import a from '../../atoms';

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
  ${({ theme: $, colour }) => `
  margin: ${$.spacing(1)};
  background-color: ${$.palette[colour].main};
  color: ${$.palette.common.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
`}
`;

const StyledPaper = styled(Paper)`
  ${({ theme: $ }) => ` 
  padding: ${$.spacing(1)} ${$.spacing(2)};
  margin: 0 ${$.spacing(1)};
  margin-top: ${$.spacing(1)};
  flex-grow: 10;
  border-width: 1px;
  text-transform: none;
  `}
`;

const LetterFab = ({ i }) => (
  <StyledAvatar colour={alphabet[i][1]}>{alphabet[i][0]}</StyledAvatar>
);

LetterFab.defaultProps = {};

LetterFab.propTypes = {
  i: prop.number.isRequired,
};

const TextOption = ({ i, text }) => (
  <Grid
    container
    direction="row"
    justify="space-between"
    alignItems="stretch"
    wrap="nowrap"
  >
    <LetterFab i={i} />
    <StyledPaper variant="outlined" color="default">
      <Typography>{text}</Typography>
    </StyledPaper>
  </Grid>
);

TextOption.defaultProps = {
  text: '',
};

TextOption.propTypes = {
  i: prop.number.isRequired,
  text: prop.string,
};

const McqOption = ({ qid }) => {
  const {
    meta: { optionNum, options },
  } = useRecoilValue(a.questions(qid));

  const hasOptionsText = options !== null;
  return (
    <Wrapper>
      <Grid container spacing={1} justify="center">
        {[...Array(optionNum)].map((_, i) => (
          <div key={i}>
            <TextOption i={i} />
            {hasOptionsText && (
              <StyledPaper variant="outlined" color="default">
                <Typography>{options[i]}</Typography>
              </StyledPaper>
            )}
          </div>
        ))}
      </Grid>
    </Wrapper>
  );
};

McqOption.propTypes = {
  qid: prop.string.isRequired,
};

export default McqOption;
