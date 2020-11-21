import Root from './Root';
import util from '../../util';

const init = () => {
  util.injectComponent(Root, '#root');
};

// return value is whether this is final deinit
const deinit = () => {
  // eslint-disable-next-line no-console
  console.log('bye');
  return true;
};
let started = false;

const interval = setInterval(() => {
  if (document.getElementsByTagName('video').length > 1) {
    if (!started) {
      init();
      started = true;
    }
  } else if (started) {
    if (deinit()) {
      clearInterval(interval);
    }
    started = false;
  }
}, 500);
