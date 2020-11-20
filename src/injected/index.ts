import { init, deinit } from './ui';

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

if (module.hot) {
  const HMR_KEY = '__parcel_hmr_reloaded';
  const reloaded = sessionStorage.getItem(HMR_KEY) != null;
  if (!reloaded) {
    sessionStorage.setItem(HMR_KEY, '');
    module.hot.dispose(() => {
      sessionStorage.removeItem(HMR_KEY);
    });
  } else {
    chrome.runtime.sendMessage({
      action: 'reload'
    });
  }
}
