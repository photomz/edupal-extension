import React from 'react';
import { RecoilRoot } from 'recoil';
import { inject } from '../util';

const Root = () => <RecoilRoot>App</RecoilRoot>;

export const init = () => {
  console.log('init');
  inject(Root, document.querySelector('#root'));
};

// return value is whether this is final deinit
export const deinit = () => {
  console.log('bye');
  return true;
};
