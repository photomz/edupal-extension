import { atom } from 'recoil';

const meetData = atom({
  key: 'meetData',
  default: {},
});

const isVisible = atom({
  key: 'isVisible',
  default: true,
});

export default {
  meetData,
  isVisible,
};
