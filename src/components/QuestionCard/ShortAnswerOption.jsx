import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import prop from 'prop-types';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import atoms from '../../atoms';

const StyledTextField = styled(TextField)`
  ${({ theme: $ }) => `
  margin: ${$.spacing(1)};
  margin-top: ${$.spacing(2)};
  `}
`;

const ShortAnswerOption = ({ num }) => {
  const { questionId } = useRecoilValue(atoms.questions)[num];
  const hasResponded = useRecoilValue(atoms.hasResponded(questionId));
  const [text, setText] = useState('');

  const handleResponse = useSetRecoilState(atoms.handleResponse);
  const handleRespond = () => {
    handleResponse({ questionId, obj: text });
  };

  return (
    <StyledTextField
      multiline
      variant="outlined"
      label="Answer"
      placeholder="Type your answer"
      rowsMax={10}
      value={text}
      onChange={(e) => setText(e.target.value)}
      disabled={hasResponded}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton tabIndex={0} onClick={handleRespond}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

ShortAnswerOption.propTypes = {
  num: prop.number.isRequired,
};

export default ShortAnswerOption;
