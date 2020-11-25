import React from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LetterFab from './LetterFab';

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

export default TextOption;
