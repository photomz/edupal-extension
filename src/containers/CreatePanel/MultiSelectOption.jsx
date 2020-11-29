import React, { useState } from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import { useRecoilState } from 'recoil';

import MuiGrid from '@material-ui/core/Grid';
import MuiTextField from '@material-ui/core/TextField';
import MuiTypography from '@material-ui/core/Typography';

import Slider from '../../components/Slider';
import ColourfulCheckbox from '../../components/ColourfulCheckbox';
import { creatorMeta, creatorAnswer } from '../../logic/create';
import g from '../../global';

const Wrapper = styled.div`
  flex-grow: 1;
`;

const TextField = styled(MuiTextField)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Check = ({ i, checked, handleCheck }) => (
  <ColourfulCheckbox
    colour={g.alphabet[i][1]}
    color="default"
    checked={checked}
    onClick={() => handleCheck(i)}
    onChange={(e) => handleCheck(i, e.target.checked)}
  >
    {g.alphabet[i][0]}
  </ColourfulCheckbox>
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
  const [meta, setMeta] = useRecoilState(creatorMeta('MultiSelect'));
  const [answer, setAnswer] = useRecoilState(creatorAnswer('MultiSelect'));
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
      <MuiTypography>Number of Options</MuiTypography>
      <Slider
        defaultValue={4}
        marks
        step={1}
        min={2}
        max={5}
        value={meta.optionNum}
        valueLabelDisplay="auto"
        onChange={(_, optionNum) => setMeta((prev) => ({ ...prev, optionNum }))}
      />
      <MuiGrid container spacing={1} justify="center">
        {[...Array(meta.optionNum)].map((_, i) => (
          <MuiGrid
            key={i}
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
            wrap="nowrap"
          >
            <Check
              i={i}
              checked={answer && !!answer[i]}
              handleCheck={handleCheck}
            />
            <TextField
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
          </MuiGrid>
        ))}
      </MuiGrid>
    </Wrapper>
  );
};

export default McqOption;
