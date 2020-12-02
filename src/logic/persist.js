const localStorageEffect = ({ name, id }) => ({ setSelf, onSet }) => {
  const key = id ? `edupal__${name}__${id}` : `edupal__${name}`;

  try {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
  } catch (e) {
    console.log(e);
    // Parsing failed
  }

  onSet((newValue) => {
    try {
      if (newValue) {
        localStorage.setItem(key, JSON.stringify(newValue));
      } else {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.log(e);
      // Parsing failed
    }
  });
};

export default {};
export { localStorageEffect };
