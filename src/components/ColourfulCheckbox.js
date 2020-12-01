import MuiCheckbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';

const ColourfulCheckbox = styled(MuiCheckbox)`
  ${({ theme: $, colour }) => `
  margin: ${$.spacing(1)}px;
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

export default ColourfulCheckbox;
