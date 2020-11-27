import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import prop from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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

const StyledButton = styled(Button)`
  ${({ theme: $ }) => ` 
  padding: ${$.spacing(1)} ${$.spacing(2)};
  margin: 0 ${$.spacing(1)};
  margin-top: ${$.spacing(1)};
  flex-grow: 10;
  border-width: 1px;
  text-transform: none;
  `}
`;

const LetterFab = ({ i, handleRespond }) => (
  <StyledAvatar colour={alphabet[i][1]} onClick={() => handleRespond(i)}>
    {alphabet[i][0]}
  </StyledAvatar>
);

LetterFab.defaultProps = {
  handleRespond: () => {},
};

LetterFab.propTypes = {
  i: prop.number.isRequired,
  handleRespond: prop.func,
};

const TextOption = ({ i, text, handleRespond }) => (
  <Grid
    container
    item
    xs={12}
    direction="row"
    justify="space-between"
    alignItems="stretch"
    wrap="nowrap"
  >
    <LetterFab i={i} handleRespond={handleRespond} />
    <StyledButton
      variant="outlined"
      color="default"
      onClick={() => handleRespond(i)}
    >
      <Typography>{text}</Typography>
    </StyledButton>
  </Grid>
);

TextOption.propTypes = {
  i: prop.number.isRequired,
  text: prop.oneOfType([prop.string, prop.number]).isRequired,
  handleRespond: prop.func.isRequired,
};

const McqOption = ({ qid }) => {
  const {
    meta: { optionNum, options },
  } = useRecoilValue(a.questions(qid));
  const handleResponse = useSetRecoilState(a.handleResponse(qid));

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
              handleRespond={handleResponse}
            />
          ) : (
            <LetterFab key={i} i={i} handleRespond={handleResponse} />
          )
        )}
      </Grid>
    </Wrapper>
  );
};

McqOption.propTypes = {
  qid: prop.string.isRequired,
};

export default McqOption;
