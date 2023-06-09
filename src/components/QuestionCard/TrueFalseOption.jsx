import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import prop from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { sendRespond, iHaveResponded } from '../../logic/response';

const StyledButton = styled(Button)`
  ${({ theme: $, colour }) => ` 
  padding: ${$.spacing(1)}px ${$.spacing(2)}px;
  margin: 0px ${$.spacing(1)}px;
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

const TrueFalseOption = ({ qid }) => {
  const hasResponded = useRecoilValue(iHaveResponded(qid));

  const handleResponse = useSetRecoilState(sendRespond(qid));

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
        [false, 'False', 'error'],
      ].map((el) => (
        <StyledButton
          key={el[1]}
          variant="contained"
          color="default"
          colour={el[2]}
          disabled={hasResponded}
          onClick={() => handleResponse(el[0])}
        >
          {el[1]}
        </StyledButton>
      ))}
    </Grid>
  );
};

TrueFalseOption.propTypes = {
  qid: prop.string.isRequired,
};

export default TrueFalseOption;
