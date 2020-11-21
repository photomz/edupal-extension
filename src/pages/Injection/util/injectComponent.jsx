import React from 'react';
import { render } from 'react-dom';

const injectComponent = (Component, query) => {
  render(<Component />, document.querySelector(query));
};

export default injectComponent;
