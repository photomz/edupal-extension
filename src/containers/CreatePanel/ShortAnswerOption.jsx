import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import MuiTextField from '@material-ui/core/TextField';
import { creatorAnswer } from '../../logic/create';

const TextField = styled(MuiTextField)`
  margin: 0 ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ShortAnswerOption = () => {
  const [answer, setAnswer] = useRecoilState(creatorAnswer('ShortAnswer'));
  return (
    <TextField
      multiline
      variant="outlined"
      placeholder="Type the answer (optional)"
      label="Answer"
      rowsMax={5}
      value={answer || ''}
      fullWidth
      onChange={(e) => setAnswer(e.target.value)}
    />
  );
};

export default ShortAnswerOption;
