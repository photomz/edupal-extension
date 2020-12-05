/* global chrome */
const injectScript = (filePath, type = 'script', tag = 'html') => {
  const node = document.getElementsByTagName(tag)[0];
  const tagType = type === 'link' ? 'link' : 'script';
  const script = document.createElement(tagType);
  if (type === 'script') {
    script.setAttribute('type', 'text/javascript');
  } else if (type === 'module') {
    script.setAttribute('type', 'module');
  } else {
    script.setAttribute('rel', 'stylesheet');
    script.setAttribute('media', 'screen');
  }

  script.setAttribute(tagType === 'script' ? 'src' : 'href', filePath);

  node.appendChild(script);
};

(async () => {
  // Wait until in call
  while (document.querySelector('#yDmH0d') === null) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 500));
  }

  const app = document.createElement('div');
  app.setAttribute('id', 'edupal');
  document.body.prepend(app);

  // Inject script into page
  injectScript(chrome.runtime.getURL('static/css/2.chunk.css'), 'link', 'head');
  injectScript(
    chrome.runtime.getURL('static/css/main.chunk.css'),
    'link',
    'head'
  );
  injectScript(chrome.runtime.getURL('static/js/2.chunk.js'), 'script', 'html');
  injectScript(
    chrome.runtime.getURL('static/js/main.chunk.js'),
    'script',
    'html'
  );
  injectScript(
    chrome.runtime.getURL('static/js/runtime-main.js'),
    'script',
    'html'
  );
})();
