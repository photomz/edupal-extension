import { atom, selector, selectorFamily, atomFamily } from 'recoil';
import mockMeetData from './data.json';
import g from '../global';

const role = atom({
  key: 'role',
  default: 'STUDENT',
  persistence_UNSTABLE: {
    type: 'role',
  },
});

const meetData = atom({
  key: 'meetData',
  default:
    process.env.NODE_ENV === 'development'
      ? mockMeetData
      : process.env.NODE_ENV === 'production' && {},
});

const isDrawerOpen = atom({ key: 'isDrawerOpen', default: false });

const questions = atomFamily({ key: 'questions', default: {} });
const questionIds = atom({ key: 'questionIds', default: [] });

const addQuestion = selector({
  key: 'addQuestion',
  set: ({ set, get }, { questionId, ...rest }) => {
    set(questions(questionId), { num: get(questionIds).length, ...rest });
    set(questionIds, (prev) => {
      const newArr = [...prev];
      newArr.unshift(questionId);
      return newArr;
    });
  },
});

const responses = atomFamily({ key: 'responses', default: [] });
const responseStudentIds = atomFamily({
  key: 'responseStudentIds',
  default: [],
});

const addResponse = selector({
  key: 'addResponse',
  set: ({ set, get }, { questionId, ...rest }) => {
    const texts = get(questions(questionId)).meta;
    console.log(texts);
    let responseText;
    switch (typeof rest.response) {
      case 'boolean':
        responseText = [rest.response.toString().toUpperCase()];
        break;
      case 'number':
        responseText =
          texts && texts.options
            ? [texts.options[rest.response]]
            : [g.alphabet[rest.response][0]];
        break;
      case 'object':
        responseText =
          texts && texts.options
            ? texts.options.filter((_, i) => rest.response[i])
            : [
                rest.response
                  .map((num) => g.alphabet[num][0])
                  .reduce((p, c) => `${p}, ${c}`, ''),
              ];
        break;
      case 'string':
        responseText = [rest.response];
        break;
      default:
        throw new Error('Unexpected response type');
    }
    console.log(rest.response, responseText);
    set(responses(questionId), (prev) =>
      prev.concat({ responseText, ...rest })
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

// TODO: Create websocket route to GET
const numStudents = atom({
  key: 'numStudents',
  default: 5,
});

// TODO: Set this when builder clicks send
const answers = atomFamily({ key: 'answers', default: null });

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
    const percent = Math.round((100 * numSelected) / get(numStudents));
    const answer = get(answers(questionId));
    const isCorrect =
      answer === null
        ? null
        : (Array.isArray(answer) && answer[option]) || answer === option;
    return { numSelected, percent, isCorrect };
  },
});

const carouselOrder = atomFamily({ key: 'carouselOrder', default: 0 });

const iHaveResponded = atomFamily({
  key: 'iHaveResponded',
  default: false,
});

const myResponse = atomFamily({
  key: 'myResponse',
  default: {},
});

const saveMyResponse = selectorFamily({
  key: 'saveMyResponse',
  set: (questionId) => ({ set, get }, obj) => {
    if (get(iHaveResponded(questionId))) return;
    set(iHaveResponded(questionId), true);
    set(myResponse(questionId), {
      ...obj,
      respondTimestamp: new Date().toISOString(),
    });
    set(carouselOrder(questionId), 1);
  },
});

const isUploaderOpen = atom({ key: 'isUploaderOpen', default: false });

const typeMap = {
  MCQ: [{ optionNum: 4, options: ['', '', '', '', ''] }, 0],
  ShortAnswer: [{}, ''],
  MultiSelect: [
    { optionNum: 4, options: ['', '', '', '', ''] },
    [false, false, false, false, false],
  ],
  TrueFalse: [{}, false],
};

const builderImage = atom({
  key: 'builderImage',
  default: '',
  persistence_UNSTABLE: { type: 'builderImage' },
});
const builderType = atom({
  key: 'builderType',
  default: 'MCQ',
  persistence_UNSTABLE: { type: 'builderType' },
});
const builderAnswer = atomFamily({
  key: 'builderAnswer',
  default: (type) => typeMap[type][1],
  persistence_UNSTABLE: {
    type: 'builderAnswer',
  },
});
const builderMeta = atomFamily({
  key: 'builderMeta',
  default: (type) => typeMap[type][0],
  persistence_UNSTABLE: {
    type: 'buildMeta',
  },
});

const tabOrder = atom({ key: 'tabOrder', default: 0 });
const reportQuestion = atom({ key: 'reportQuestion', default: '' });
const goToReport = selectorFamily({
  key: 'goToReport',
  set: (questionId) => ({ set }) => {
    set(tabOrder, 3);
    set(reportQuestion, questionId);
  },
});

export default {
  meetData,
  isDrawerOpen,
  questions,
  questionIds,
  addQuestion,
  carouselOrder,
  myResponse,
  saveMyResponse,
  role,
  isUploaderOpen,
  builderType,
  builderAnswer,
  builderMeta,
  builderImage,
  iHaveResponded,
  responses,
  responseStudentIds,
  addResponse,
  optionBar,
  numStudents,
  answers,
  responseSpeed,
  tabOrder,
  reportQuestion,
  goToReport,
};
