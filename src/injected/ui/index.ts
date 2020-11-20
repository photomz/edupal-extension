import { inject } from '../util';
import React from 'react';
import ReactDOM from 'react-dom';

export const init = () => {
  console.log("init")
}

// return value is whether this is final deinit
export const deinit = (): boolean => {
  console.log('bye');
  return true;
};
