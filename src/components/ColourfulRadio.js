import MuiRadio from '@material-ui/core/Radio';
import styled from 'styled-components';

const ColourfulRadio = styled(MuiRadio)`
  ${({ theme: $, colour }) => `
  
  margin: ${$.spacing(1)}px;
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
  margin-right: ${$.spacing(1)}px;
`}
`;

export default ColourfulRadio;
