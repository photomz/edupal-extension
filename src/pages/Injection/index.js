// /* global chrome */
import renderRoot from './Root';

(async () => {
  // Wait until in call
  while (document.querySelector('#yDmH0d') === null) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 500));
  }

  // Create wrapper for Vue App
  const id = 'edupal';
  const app = document.createElement('div');
  app.setAttribute('id', id);

  const root = document.querySelector('body');
  root.appendChild(app);
  renderRoot(id);
})();
