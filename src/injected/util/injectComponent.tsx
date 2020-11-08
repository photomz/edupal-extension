import React, { ComponentType } from 'react';
import { render } from 'react-dom';

const injectComponent = (Component: ComponentType, query: string): void => {
  render(<Component />, document.querySelector(query));
};

export default injectComponent;
