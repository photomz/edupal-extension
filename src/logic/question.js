import { atom, atomFamily, selector } from 'recoil';

// TODO: Remove persistence
const questions = atomFamily({
  key: 'questions',
  default: {},
  persistence_UNSTABLE: { type: 'questions' },
});
const questionIds = atom({
  key: 'questionIds',
  default: [],
  persistence_UNSTABLE: { type: 'questionIds' },
});

const receiveAsk = selector({
  key: 'receiveAsk',
  set: ({ set, get }, { questionId, ...rest }) => {
    const obj = {
      num: get(questionIds).length,
      ...rest,
    };
    obj.question.text = obj.question.text || `Question ${obj.num + 1}`;
    set(questions(questionId), obj);
    set(questionIds, (prev) => {
      const newArr = [...prev];
      newArr.unshift(questionId);
      return newArr;
    });
  },
});

export default {};
export { questions, questionIds, receiveAsk };
