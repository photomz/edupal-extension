import { atom, selector, selectorFamily, atomFamily } from 'recoil';
import mockMeetData from './data.json';

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
    set(questionIds, (prev) => prev.concat(questionId));
  },
});

const carouselOrder = atomFamily({ key: 'carouselOrder', default: 0 });

const hasResponded = atomFamily({
  key: 'hasResponded',
  default: false,
});

const response = atomFamily({
  key: 'response',
  default: {},
});

const handleResponse = selectorFamily({
  key: 'handleResponse',
  set: (questionId) => ({ set, get }, obj) => {
    if (get(hasResponded(questionId))) return;
    console.log(questionId, obj);
    set(hasResponded(questionId), true);
    set(response(questionId), {
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

const builderType = atom({ key: 'builderType', default: 'MCQ' });
const builderAnswer = atomFamily({
  key: 'builderAnswer',
  default: (type) => typeMap[type][1],
});
const builderMeta = atomFamily({
  key: 'builderMeta',
  default: (type) => typeMap[type][0],
});

export default {
  meetData,
  isDrawerOpen,
  questions,
  questionIds,
  addQuestion,
  carouselOrder,
  response,
  handleResponse,
  role,
  isUploaderOpen,
  builderType,
  builderAnswer,
  builderMeta,
  hasResponded,
};
