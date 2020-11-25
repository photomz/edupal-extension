import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import prop from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import atoms from '../../../atoms';

const Wrapper = styled.div``;

const alphabet = [
  ['A', 'primary'],
  ['B', 'red'],
  ['C', 'green'],
  ['D', 'secondary'],
  ['E', 'yellow'],
];

const StyledCheckbox = styled(Checkbox)`
  ${({ $, colour }) => `
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
  ${({ $ }) => ` 
  padding: ${$.spacing(1)} ${$.spacing(2)};
  margin: 0 ${$.spacing(1)};
  margin-top: ${$.spacing(1)};
  flex-grow: 10;
  border-width: 1px;
  text-transform: none;
  `}
`;

const Check = ({ i, handleCheck, hasResponded, checked }) => {
  const $ = useTheme();
  return (
    <StyledCheckbox
      $={$}
      colour={alphabet[i][1]}
      sizes="large"
      color="default"
      checked={checked}
      disabled={hasResponded}
      onClick={() => handleCheck(i)}
      onChange={(e) => handleCheck(i, e.target.checked)}
    >
      {alphabet[i][0]}
    </StyledCheckbox>
  );
};

Check.defaultProps = {
  handleCheck: () => {},
};

Check.propTypes = {
  i: prop.number.isRequired,
  hasResponded: prop.bool.isRequired,
  checked: prop.bool.isRequired,
  handleCheck: prop.func,
};

const TextOption = ({ i, text, handleCheck, hasResponded, checked }) => {
  const $ = useTheme();

  return (
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
        $={$}
        variant="outlined"
        color="default"
        onClick={() => handleCheck(i)}
      >
        <Typography>{text}</Typography>
      </StyledButton>
    </Grid>
  );
};

TextOption.propTypes = {
  i: prop.number.isRequired,
  text: prop.oneOfType([prop.string, prop.number]).isRequired,
  hasResponded: prop.bool.isRequired,
  handleCheck: prop.func.isRequired,
  checked: prop.bool.isRequired,
};

const DoneButton = styled(Button)`
  ${({ $ }) => `margin-bottom: ${$.spacing(1)};`}
`;

const MultiSelectOption = ({ num }) => {
  const {
    meta: { optionNum, options },
    questionId,
  } = useRecoilValue(atoms.questions)[num];
  const hasResponded = useRecoilValue(atoms.questionResponseStates)[questionId];
  const $ = useTheme();

  const [checkedMap, setCheckedMap] = useState(
    [...Array(optionNum)].fill(false)
  );

  const hasOptionsText = options !== null;
  const handleCheck = (i, checked) => {
    if (hasResponded) return;
    setCheckedMap((prevMap) => {
      const newMap = [...prevMap];
      newMap[i] = checked !== undefined ? checked : !prevMap[i];
      return newMap;
    });
  };

  const handleResponse = useSetRecoilState(atoms.handleResponse);
  const handleRespond = () => {
    handleResponse({ questionId, obj: checkedMap });
  };

  return (
    <Wrapper>
      <Grid container spacing={1} justify="center">
        {[...Array(optionNum)].map((_, i) =>
          hasOptionsText ? (
            <TextOption
              key={i}
              i={i}
              text={options[i]}
              checked={checkedMap[i]}
              handleCheck={handleCheck}
              hasResponded={hasResponded || false}
              // hasResponded is empty object on init so undefined, must default to false
            />
          ) : (
            <Check
              key={i}
              i={i}
              checked={checkedMap[i]}
              handleCheck={handleCheck}
              hasResponded={hasResponded || false}
            />
          )
        )}
        <DoneButton
          $={$}
          color="primary"
          disabled={hasResponded}
          onClick={handleRespond}
        >
          Done
        </DoneButton>
      </Grid>
    </Wrapper>
  );
};

MultiSelectOption.propTypes = {
  num: prop.number.isRequired,
};

export default MultiSelectOption;
