import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import MuiGrid from '@material-ui/core/Grid';
import MuiRadio from '@material-ui/core/Radio';
import MuiTypography from '@material-ui/core/Typography';
import MuiButton from '@material-ui/core/Button';
import { creatorAnswer } from '../../logic/create';

const InnerRadio = styled(MuiRadio)`
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

const Button = styled(MuiButton)`
  ${({ theme: $, colour }) => ` 
  padding: 0px ${$.spacing(2)}px;
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

const Label = styled(MuiTypography)`
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
`;

const TrueFalseOption = () => {
  const [answer, setAnswer] = useRecoilState(creatorAnswer('TrueFalse'));
  return (
    <MuiGrid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      wrap="nowrap"
    >
      {[
        [true, 'True', 'primary'],
        [false, 'False', 'error'],
      ].map((el) => (
        <Button
          key={el[1]}
          variant="contained"
          color="default"
          colour={el[2]}
          onClick={() => setAnswer((prev) => (prev === el[0] ? null : el[0]))}
        >
          <MuiGrid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <InnerRadio
              colour={el[2]}
              checked={answer === el[0]}
              value={el[0]}
            />
            <Label variant="body2">{el[1]}</Label>
          </MuiGrid>
        </Button>
      ))}
    </MuiGrid>
  );
};

export default TrueFalseOption;
