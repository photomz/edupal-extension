import { selector } from 'recoil';
import { isDrawerOpen, tabOrder } from './common';
import { reportQuestion } from './stats';

const receiveAskAction = selector({
  key: 'receiveAskAction',
  set: ({ set }) => {
    set(isDrawerOpen, true);
    set(tabOrder, 0);
  },
});

const receiveRespondAction = selector({
  key: 'receiveRespondAction',
  set: ({ set }, qid) => {
    set(isDrawerOpen, true);
    set(tabOrder, 4);
    set(reportQuestion, qid);
  },
});

export default {};
export { receiveAskAction, receiveRespondAction };
