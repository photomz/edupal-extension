import MuiSlider from '@material-ui/core/Slider';
import styled from 'styled-components';

const Slider = styled(MuiSlider)`
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

export default Slider;
