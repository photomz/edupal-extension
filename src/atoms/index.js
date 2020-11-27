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
  set: ({ set }, { questionId, ...rest }) => {
    set(responses(questionId), (prev) => prev.concat(rest));
    set(responseStudentIds(questionId), (prev) => prev.concat(rest.student.id));
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
    console.log(questionId, obj);
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
};
