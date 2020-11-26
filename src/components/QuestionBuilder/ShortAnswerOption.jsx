import React from 'react';
import prop from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const StyledTextField = styled(TextField)`
  margin: 0 ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ShortAnswerOption = ({ answer, setAnswer }) => (
  <StyledTextField
    multiline
    variant="outlined"
    placeholder="Type the answer (optional)"
    label="Answer"
    rowsMax={5}
    value={answer}
    fullWidth
    onChange={(e) => setAnswer(e.target.value)}
  />
);

ShortAnswerOption.defaultProps = {
  answer: '',
};

ShortAnswerOption.propTypes = {
  answer: prop.string,
  setAnswer: prop.func.isRequired,
};

export default ShortAnswerOption;
