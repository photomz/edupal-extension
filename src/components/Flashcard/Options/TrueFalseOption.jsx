import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import prop from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import atoms from '../../../atoms';

const StyledButton = styled(Button)`
  ${({ $, colour }) => ` 
  padding: ${$.spacing(1)} ${$.spacing(2)};
  margin: 0 ${$.spacing(1)};
  flex-grow: 10;
  border-width: 1px;
  background-color: ${$.palette[colour].main};
  color: ${$.palette.common.white};
  &:hover {
    background-color: ${$.palette[colour].dark};
    box-shadow: ${$.shadows[4]};
  }
  `}
`;

const TrueFalseOption = ({ num }) => {
  const { questionId } = useRecoilValue(atoms.questions)[num];
  const setHasResponded = useSetRecoilState(atoms.flipResponse);
  const setResponse = useSetRecoilState(atoms.responseSelector);
  const hasResponded = useRecoilValue(atoms.questionResponseStates)[questionId];
  const setTimestamp = useSetRecoilState(atoms.respondTimestampSelector);
  const $ = useTheme();

  const handleRespond = (tf) => {
    setHasResponded(questionId);
    setResponse({ [questionId]: tf });
    setTimestamp({ [questionId]: new Date().toISOString() });
  };

  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      justify="space-between"
      alignItems="stretch"
      wrap="nowrap"
    >
      {[
        [true, 'True', 'primary'],
        [false, 'False', 'red'],
      ].map((el) => (
        <StyledButton
          key={el[1]}
          $={$}
          variant="contained"
          color="default"
          colour={el[2]}
          disabled={hasResponded}
          onClick={() => handleRespond(el[0])}
        >
          <Typography>{el[1]}</Typography>
        </StyledButton>
      ))}
    </Grid>
  );
};

TrueFalseOption.propTypes = {
  num: prop.number.isRequired,
};

export default TrueFalseOption;
