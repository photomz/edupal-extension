import { atom, atomFamily, selector } from 'recoil';

const questions = atomFamily({ key: 'questions', default: {} });
const questionIds = atom({ key: 'questionIds', default: [] });

const receiveAsk = selector({
  key: 'receiveAsk',
  set: ({ set, get }, { questionId, ...rest }) => {
    set(questions(questionId), { num: get(questionIds).length, ...rest });
    set(questionIds, (prev) => {
      const newArr = [...prev];
      newArr.unshift(questionId);
      return newArr;
    });
  },
});

export default {};
export { questions, questionIds, receiveAsk };
