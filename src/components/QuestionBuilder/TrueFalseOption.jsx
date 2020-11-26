/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import styled from 'styled-components';
import prop from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const StyledRadio = styled(Radio)`
  ${({ theme: $, colour }) => `
  background-color: ${$.palette[colour].main};
  transition: all 0.3s ease-in-out;
	color: ${$.palette.common.white};
	&:hover, &&&.Mui-checked {
    color: ${$.palette.common.white};
    background-color: ${$.palette[colour].dark};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
	padding: 0;
`}
`;

const StyledButton = styled(Button)`
  ${({ theme: $, colour }) => ` 
  padding: 0 ${$.spacing(2)};
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

const StyledTypography = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing(1)};
  margin-right: ${({ theme }) => theme.spacing(2)};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
`;

const TrueFalseOption = ({ answer, setAnswer }) => (
  <Grid
    container
    direction="row"
    justify="center"
    alignItems="stretch"
    wrap="nowrap"
  >
    {[
      [true, 'True', 'primary'],
      [false, 'False', 'red'],
    ].map((el) => (
      <StyledButton
        key={el[1]}
        variant="contained"
        color="default"
        colour={el[2]}
        onClick={() => setAnswer((prev) => (prev === el[0] ? null : el[0]))}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <StyledRadio
            colour={el[2]}
            checked={answer === el[0]}
            value={el[0]}
          />
          <StyledTypography variant="body2">{el[1]}</StyledTypography>
        </Grid>
      </StyledButton>
    ))}
  </Grid>
);

TrueFalseOption.defaultProps = {
  answer: null,
};

TrueFalseOption.propTypes = {
  answer: prop.bool,
  setAnswer: prop.func.isRequired,
};

export default TrueFalseOption;
