import React from 'react';
import { RecoilRoot } from 'recoil';
import { inject } from '../util/index.ts';

const Root = () => <RecoilRoot>App</RecoilRoot>;

export const init = () => {
  console.log('init');
  inject(Root, document.querySelector('#root'));
};

// return value is whether this is final deinit
export const deinit = (): boolean => {
  console.log('bye');
  return true;
};
