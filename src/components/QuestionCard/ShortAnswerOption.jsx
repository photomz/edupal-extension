import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import prop from 'prop-types';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import a from '../../atoms';

const StyledTextField = styled(TextField)`
  ${({ theme: $ }) => `
  margin: ${$.spacing(1)};
  margin-top: ${$.spacing(2)};
  `}
`;

const ShortAnswerOption = ({ qid }) => {
  const hasResponded = useRecoilValue(a.iHaveResponded(qid));
  const [text, setText] = useState('');

  const handleResponse = useSetRecoilState(a.sendRespond(qid));

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
            <IconButton tabIndex={0} onClick={() => handleResponse(text)}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

ShortAnswerOption.propTypes = {
  qid: prop.string.isRequired,
};

export default ShortAnswerOption;
