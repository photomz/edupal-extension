// /* global chrome */
import renderRoot from './Root';

// const init = () => {
//   util.injectComponent(Root, '#root');
// };

// // return value is whether this is final deinit
// const deinit = () => {
//   // eslint-disable-next-line no-console
//   console.log('bye');
//   return true;
// };
// const started = false;

(async () => {
  // Wait until in call
  while (document.querySelector('.d7iDfe') !== null) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 500));
  }

  // Create wrapper for Vue App
  const id = 'edupal';
  const app = document.createElement('div');
  app.setAttribute('id', id);
  document.body.prepend(app);
  renderRoot(id);
})();

// const injectScript = (filePath, type = 'script', tag = 'html') => {
//   const node = document.getElementsByTagName(tag)[0];
//   const tagType = type === 'link' ? 'link' : 'script';
//   const script = document.createElement(tagType);
//   if (type === 'script') {
//     script.setAttribute('type', 'text/javascript');
//   } else if (type === 'module') {
//     script.setAttribute('type', 'module');
//   } else {
//     script.setAttribute('rel', 'stylesheet');
//     script.setAttribute('media', 'screen');
//   }

//   script.setAttribute(tagType === 'script' ? 'src' : 'href', filePath);

//   node.appendChild(script);
// };

// (async () => {
//   // Wait until in call
//   while (document.querySelector('.d7iDfe') !== null) {
//     // eslint-disable-next-line no-await-in-loop
//     await new Promise((r) => setTimeout(r, 500));
//   }

//   // Create wrapper for Vue App
//   const app = document.createElement('div');
//   app.setAttribute('id', 'edupal');
//   document.body.prepend(app);

//   // Inject script into page
//   // TODO: Add mixpanel script init and link
//   injectScript(
//     chrome.runtime.getURL('build/injection.bundle.js'),
//     'script',
//     'html'
//   );
// })();
