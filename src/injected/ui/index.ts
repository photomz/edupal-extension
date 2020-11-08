import { inject } from '../util';

export const init = (): void => {
  console.log('hi');
};

// return value is whether this is final deinit
export const deinit = (): boolean => {
  console.log('bye');
  return true;
};
