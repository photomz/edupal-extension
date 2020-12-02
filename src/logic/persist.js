import Util from '../util';

const localStorageEffect = ({ name, id }) => ({ setSelf, onSet }) => {
  const key = id ? `edupal__${name}__${id}` : `edupal__${name}`;

  try {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      if (id === 'M1DyjknmZL18qbup37Svk')
        console.log('HEY LISTEN', JSON.parse(savedValue));
      // https://github.com/facebookexperimental/Recoil/issues/774
      window.requestAnimationFrame(() => setSelf(JSON.parse(savedValue)));
    }
  } catch (e) {
    Util.log(e);
  }

  onSet((newValue) => {
    try {
      if (newValue) {
        localStorage.setItem(key, JSON.stringify(newValue));
      } else {
        localStorage.removeItem(key);
      }
    } catch (e) {
      Util.log(e);
    }
  });
};

export default {};
export { localStorageEffect };
