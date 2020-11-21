import React from 'react';
import { RecoilRoot } from 'recoil';
import { inject } from '../util';

const Root = () => <RecoilRoot>App</RecoilRoot>;

export const init = () => {
  // eslint-disable-next-line no-console
  console.log('init');
  inject(Root, document.querySelector('#root'));
};

// return value is whether this is final deinit
export const deinit = () => {
  // eslint-disable-next-line no-console
  console.log('bye');
  return true;
};
