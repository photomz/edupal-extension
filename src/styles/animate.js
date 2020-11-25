import { css, keyframes } from 'styled-components';
import $ from './global';

const slideInLeft = keyframes`
  from {
    transform: translate3d(-150vw, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideInRight = keyframes`
  from {
    transform: translate3d(150vw, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutLeft = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-150vw, 0, 0);
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(150vw, 0, 0);
  }
`;

const slide = {
  inleft: css`0.7s ${slideInLeft} ${$.easingFn.decelerate};`,
  inright: css`0.7s ${slideInRight} ${$.easingFn.decelerate};`,
  outleft: css`0.7s ${slideOutLeft} ${$.easingFn.accelerate};`,
  outright: css`0.7s ${slideOutRight} ${$.easingFn.accelerate};`,
};
export default slide;
