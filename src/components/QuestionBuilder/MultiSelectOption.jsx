import React, { useState } from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import { useRecoilState } from 'recoil';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import a from '../../atoms';

const StyledCheckbox = styled(Checkbox)`
  ${({ theme: $, colour }) => `
  margin: ${$.spacing(1)};
  background-color: ${$.palette[colour].main};
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: ${$.shadows[4]};
    background-color: ${$.palette[colour].dark};
  }
  color: ${$.palette.common.white};
  font-weight: ${$.typography.fontWeightMedium};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
`}
`;

const Wrapper = styled.div`
  flex-grow: 1;
`;

const alphabet = [
  ['A', 'primary'],
  ['B', 'red'],
  ['C', 'green'],
  ['D', 'secondary'],
  ['E', 'yellow'],
];

const StyledTextField = styled(TextField)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
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

const Check = ({ i, checked, handleCheck }) => (
  <StyledCheckbox
    colour={alphabet[i][1]}
    color="default"
    checked={checked}
    onClick={() => handleCheck(i)}
    onChange={(e) => handleCheck(i, e.target.checked)}
  >
    {alphabet[i][0]}
  </StyledCheckbox>
);

Check.defaultProps = {
  handleCheck: () => {},
};

Check.propTypes = {
  i: prop.number.isRequired,
  checked: prop.bool.isRequired,
  handleCheck: prop.func,
};

const McqOption = () => {
  const [meta, setMeta] = useRecoilState(a.builderMeta('MultiSelect'));
  const [answer, setAnswer] = useRecoilState(a.builderAnswer('MultiSelect'));
  const [textInputs, setTextInputs] = useState(meta.options);

  const handleCheck = (i, checked) => {
    setAnswer((prevArr) => {
      const newArr = [...prevArr];
      newArr[i] = checked !== undefined ? checked : !prevArr[i];
      return newArr;
    });
  };

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
            <Check
              i={i}
              checked={answer[i] || false}
              handleCheck={handleCheck}
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
