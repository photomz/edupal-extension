import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import sanitiseResponse from './sanitiseResponse';
import { questions } from './question';
import { tabOrder } from './common';
import { localStorageEffect } from './persist';

const responses = atomFamily({
  key: 'responses',
  default: [],
  effects_UNSTABLE: (id) => [localStorageEffect({ name: 'responses', id })],
});
const responseStudentIds = atomFamily({
  key: 'responseStudentIds',
  default: [],
  effects_UNSTABLE: (id) => [
    localStorageEffect({ name: 'responseStudentIds', id }),
  ],
});

const receiveRespond = selector({
  key: 'receiveRespond',
  set: ({ set, get }, { questionId, ...rest }) => {
    const texts = get(questions(questionId)).meta;
    set(responses(questionId), (prev) =>
      prev.concat({
        responseText: sanitiseResponse(texts, rest.response),
        ...rest,
      })
    );
    set(responseStudentIds(questionId), (prev) => prev.concat(rest.student.id));
  },
});

const responseSpeed = selectorFamily({
  key: 'responseSpeed',
  get: (questionId) => ({ get }) => {
    const { askTimestamp } = get(questions(questionId));
    const times = get(responses(questionId)).map(
      ({ respondTimestamp }) =>
        (new Date(respondTimestamp) - new Date(askTimestamp)) / 1000
    );
    const avgTime = Math.round(
      times.reduce((prev, curr) => prev + curr, 0) / times.length
    );
    return avgTime || 0;
  },
});

const numStudents = atomFamily({
  key: 'numStudents',
  default: 1, // 0 might give ZeroDivision error
  effects_UNSTABLE: (id) => [localStorageEffect({ name: 'numStudents', id })],
});

const receiveNumStudents = selector({
  key: 'receiveNumStudents',
  set: ({ set }, { questionId, numStudents: num }) => {
    set(numStudents(questionId), num);
  },
});

const answers = atomFamily({
  key: 'answers',
  default: null,
  effects_UNSTABLE: (id) => [localStorageEffect({ name: 'answers', id })],
});

const optionBar = selectorFamily({
  key: 'selectedOptionRate',
  get: ({ questionId, option }) => ({ get }) => {
    const numSelected = get(responses(questionId)).reduce(
      (selected, { response }) =>
        selected +
        !!(
          (Array.isArray(response) && response[option]) ||
          response === option
        ),
      0
    );
    const percent = Math.round(
      (100 * numSelected) / (get(numStudents(questionId)) || 1)
    );
    const answer = get(answers(questionId));
    const isCorrect =
      answer === null
        ? null
        : (Array.isArray(answer) && answer[option]) || answer === option;
    return { numSelected, percent, isCorrect };
  },
});

const reportQuestion = atom({ key: 'reportQuestion', default: '' });
const goToReport = selectorFamily({
  key: 'goToReport',
  set: (questionId) => ({ set }) => {
    set(tabOrder, 4);
    set(reportQuestion, questionId);
  },
});

export default {};
export {
  responses,
  responseStudentIds,
  receiveRespond,
  responseSpeed,
  numStudents,
  answers,
  optionBar,
  reportQuestion,
  goToReport,
  receiveNumStudents,
};
