import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import a from '../../atoms';
import g from '../../global';

const Wrapper = styled.div`
  flex-grow: 1;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledRadio = styled(Radio)`
  ${({ theme: $, colour }) => `
  
  margin: ${$.spacing(1)};
  background-color: ${$.palette[colour].main};
  transition: all 0.3s ease-in-out;
  &:hover, &&&.Mui-checked {
    color: ${$.palette.common.white};
    box-shadow: ${$.shadows[4]};
    background-color: ${$.palette[colour].dark};
  }
  &&&.Mui-checked:hover {
    box-shadow: ${$.shadows[8]};
  }
  color: ${$.palette.common.white};
  font-weight: ${$.typography.fontWeightMedium};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  margin-right: ${$.spacing(1)};
`}
`;

const StyledSlider = styled(Slider)`
  color: ${({ theme }) => theme.palette.secondary.main};
  height: 8;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  &&& .MuiSlider-thumb {
    height: 24;
    width: 24;
    background-color: ${({ theme }) => theme.palette.common.white};
    border: 2px solid currentColor;
    margin-top: -8;
    margin-left: -12;
  }
  &&& .MuiSlider-thumb:hover,
  &&& .MuiSlider-thumb:active,
  &&& .MuiSlider-thumb:focus {
    box-shadow: inherit;
  }
  &&& .MuiSlider-valueLabel {
    left: calc(50% - 16px);
  }
  &&& .MuiSlider-track {
    height: 8;
    border-radius: 4;
  }
  &&& .MuiSlider-rail {
    height: 8;
    border-radius: 4;
  }
`;

const McqOption = () => {
  const [meta, setMeta] = useRecoilState(a.builderMeta('MCQ'));
  const [answer, setAnswer] = useRecoilState(a.builderAnswer('MCQ'));
  const [textInputs, setTextInputs] = useState(meta.options);

  return (
    <Wrapper>
      <Typography>Number of Options</Typography>
      <StyledSlider
        defaultValue={4}
        marks
        step={1}
        min={2}
        max={5}
        value={meta.optionNum}
        valueLabelDisplay="auto"
        onChange={(_, optionNum) => setMeta((prev) => ({ ...prev, optionNum }))}
      />
      <Grid container spacing={1} justify="center">
        {[...Array(meta.optionNum)].map((_, i) => (
          <Grid
            key={i}
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
            wrap="nowrap"
          >
            <StyledRadio
              colour={g.alphabet[i][1]}
              checked={answer === i}
              value={i}
              onClick={(e) =>
                setAnswer((prev) => {
                  // Uncheck if user clicks twice
                  const value = parseInt(e.target.value, 10);
                  if (prev === value) return null;
                  return value;
                })
              }
            />
            <StyledTextField
              multiline
              fullWidth
              variant="outlined"
              placeholder={`Option #${i + 1}`}
              rowsMax={5}
              value={textInputs[i]}
              onBlur={() =>
                setMeta((prev) => ({ ...prev, options: [...textInputs] }))
              }
              onChange={(e) =>
                setTextInputs((prev) => {
                  const newVal = [...prev];
                  newVal[i] = e.target.value;
                  return newVal;
                })
              }
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default McqOption;
