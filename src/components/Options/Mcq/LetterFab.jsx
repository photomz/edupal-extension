import React from 'react';
import styled from 'styled-components';
import prop from 'prop-types';

import Avatar from '@material-ui/core/Avatar';

const alphabet = [
  ['A', 'primary'],
  ['B', 'red'],
  ['C', 'green'],
  ['D', 'secondary'],
  ['E', 'yellow'],
];

const StyledAvatar = styled(Avatar)`
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

const LetterFab = ({ i, handleRespond }) => (
  <StyledAvatar
    colour={alphabet[i][1]}
    sizes="large"
    onClick={() => handleRespond(i)}
  >
    {alphabet[i][0]}
  </StyledAvatar>
);

LetterFab.defaultProps = {
  handleRespond: () => {},
};

LetterFab.propTypes = {
  i: prop.number.isRequired,
  handleRespond: prop.func,
};

export default LetterFab;
