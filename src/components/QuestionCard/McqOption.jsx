import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import prop from 'prop-types';

import MuiGrid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
import MuiButton from '@material-ui/core/Button';

import LazyAvatar from '../LazyAvatar';
import { sendRespond } from '../../logic/response';
import { questions } from '../../logic/question';
import g from '../../global';

const StyledAvatar = styled(LazyAvatar)`
  ${({ theme: $, colour }) => `
  
  margin: ${$.spacing(1)}px;
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

const StyledButton = styled(MuiButton)`
  ${({ theme: $ }) => ` 
  padding: ${$.spacing(1)}px ${$.spacing(2)}px;
  margin: 0px ${$.spacing(1)}px;
  margin-top: ${$.spacing(1)}px;
  flex-grow: 10;
  border-width: 1px;
  text-transform: none;
  `}
`;

const LetterFab = ({ i, handleRespond }) => (
  <StyledAvatar colour={g.alphabet[i][1]} onClick={() => handleRespond(i)}>
    {g.alphabet[i][0]}
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
  <MuiGrid
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
      <MuiTypography>{text}</MuiTypography>
    </StyledButton>
  </MuiGrid>
);

TextOption.propTypes = {
  i: prop.number.isRequired,
  text: prop.oneOfType([prop.string, prop.number]).isRequired,
  handleRespond: prop.func.isRequired,
};

const McqOption = ({ qid }) => {
  const {
    meta: { optionNum, options },
  } = useRecoilValue(questions(qid));
  const handleResponse = useSetRecoilState(sendRespond(qid));

  const hasOptionsText = options !== null;

  return (
    <MuiGrid container spacing={1} justify="center">
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
    </MuiGrid>
  );
};

McqOption.propTypes = {
  qid: prop.string.isRequired,
};

export default McqOption;
