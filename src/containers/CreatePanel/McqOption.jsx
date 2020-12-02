import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import MuiGrid from '@material-ui/core/Grid';
import MuiTextField from '@material-ui/core/TextField';
import MuiText from '@material-ui/core/Typography';

import ColourfulRadio from '../../components/ColourfulRadio';
import Slider from '../../components/Slider';
import g from '../../global';
import { creatorMeta, creatorAnswer } from '../../logic/create';

const Wrapper = styled.div`
  flex-grow: 1;
`;

const TextField = styled(MuiTextField)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const McqOption = () => {
  const [meta, setMeta] = useRecoilState(creatorMeta('MCQ'));
  const [answer, setAnswer] = useRecoilState(creatorAnswer('MCQ'));
  // const [textInputs, setTextInputs] = useState(meta.options);

  return (
    <Wrapper>
      <MuiText>Number of Options</MuiText>
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
            <ColourfulRadio
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
            <TextField
              multiline
              fullWidth
              variant="outlined"
              placeholder={`Option #${i + 1}`}
              rowsMax={5}
              value={meta.options[i]}
              // onBlur={() =>
              //   setMeta((prev) => ({ ...prev, options: [...textInputs] }))
              // }
              onChange={(e) =>
                setMeta((prev) => {
                  const newVal = [...prev.options];
                  newVal[i] = e.target.value;
                  return { ...prev, options: [...newVal] };
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
