import MuiSlider from '@material-ui/core/Slider';
import styled from 'styled-components';

const Slider = styled(MuiSlider)`
  color: ${({ theme }) => theme.palette.secondary.main};
  height: 8px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  &&& .MuiSlider-thumb {
    height: 24px;
    width: 24px;
    background-color: ${({ theme }) => theme.palette.common.white};
    border: 2px solid currentColor;
    margin-top: -8px;
    margin-left: -12px;
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
    height: 8px;
    border-radius: 4px;
  }
  &&& .MuiSlider-rail {
    height: 8px;
    border-radius: 4px;
  }
`;

export default Slider;
