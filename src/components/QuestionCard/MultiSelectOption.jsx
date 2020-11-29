import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import prop from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import a from '../../atoms';
import g from '../../global';

const Wrapper = styled.div``;

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

const Check = ({ i, handleCheck, hasResponded, checked }) => (
  <StyledCheckbox
    colour={g.alphabet[i][1]}
    color="default"
    checked={checked}
    disabled={hasResponded}
    onClick={() => handleCheck(i)}
    onChange={(e) => handleCheck(i, e.target.checked)}
  >
    {g.alphabet[i][0]}
  </StyledCheckbox>
);

Check.defaultProps = {
  handleCheck: () => {},
};

Check.propTypes = {
  i: prop.number.isRequired,
  hasResponded: prop.bool.isRequired,
  checked: prop.bool.isRequired,
  handleCheck: prop.func,
};

const TextOption = ({ i, text, handleCheck, hasResponded, checked }) => (
  <Grid
    container
    item
    xs={12}
    direction="row"
    justify="space-between"
    alignItems="stretch"
    wrap="nowrap"
  >
    <Check
      hasResponded={hasResponded}
      i={i}
      checked={checked}
      handleCheck={handleCheck}
    />
    <StyledButton
      variant="outlined"
      color="default"
      onClick={() => handleCheck(i)}
    >
      <Typography>{text}</Typography>
    </StyledButton>
  </Grid>
);

TextOption.propTypes = {
  i: prop.number.isRequired,
  text: prop.oneOfType([prop.string, prop.number]).isRequired,
  hasResponded: prop.bool.isRequired,
  handleCheck: prop.func.isRequired,
  checked: prop.bool.isRequired,
};

const DoneButton = styled(Button)``;

const MultiSelectOption = ({ qid }) => {
  const {
    meta: { optionNum, options },
  } = useRecoilValue(a.questions(qid));
  const hasResponded = useRecoilValue(a.iHaveResponded(qid));

  const [checkedArr, setCheckedArr] = useState(
    [...Array(optionNum)].fill(false)
  );

  const hasOptionsText = options !== null;
  const handleCheck = (i, checked) => {
    setCheckedArr((prevMap) => {
      const newMap = [...prevMap];
      newMap[i] = checked !== undefined ? checked : !prevMap[i];
      return newMap;
    });
  };

  const handleResponse = useSetRecoilState(a.sendRespond(qid));

  return (
    <Wrapper>
      <Grid container spacing={1} justify="center">
        {[...Array(optionNum)].map((_, i) =>
          hasOptionsText ? (
            <TextOption
              key={i}
              i={i}
              text={options[i]}
              checked={checkedArr[i]}
              handleCheck={handleCheck}
              hasResponded={hasResponded || false}
              // hasResponded is empty object on init so undefined, must default to false
            />
          ) : (
            <Check
              key={i}
              i={i}
              checked={checkedArr[i]}
              handleCheck={handleCheck}
              hasResponded={hasResponded || false}
            />
          )
        )}
        <DoneButton
          color="primary"
          disabled={hasResponded}
          onClick={() => handleResponse(checkedArr)}
        >
          Done
        </DoneButton>
      </Grid>
    </Wrapper>
  );
};

MultiSelectOption.propTypes = {
  qid: prop.string.isRequired,
};

export default MultiSelectOption;
