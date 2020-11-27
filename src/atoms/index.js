import { atom, selector, selectorFamily } from 'recoil';
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

const questions = atom({ key: 'questions', default: {} });
const questionNum = atom({ key: 'questionNum', default: 0 });
const questionIds = atom({ key: 'questionIds', default: [] });

const questionSelector = selectorFamily({
  key: 'questionSelector',
  get: (questionId) => ({ get }) => get(questions)[questionId],
  set: () => ({ set, get }, { questionId, ...rest }) => {
    set(questions, (prev) => ({
      ...prev,
      [questionId]: { num: get(questionNum), ...rest },
    }));
    set(questionNum, (prev) => prev + 1);
    set(questionIds, (prev) => prev.concat(questionId));
  },
});

const carouselOrderAtom = atom({ key: 'carouselOrder', default: {} });

// TODO: Migrate to selectorFamily which supports get arguments
const carouselOrder = selectorFamily({
  key: 'carouselOrder',
  get: (questionId) => ({ get }) => get(carouselOrderAtom)[questionId],
  // Toggle flipping for flashcard, by questionId key
  set: (questionId) => ({ set, get }) => {
    const prev = get(carouselOrderAtom)[questionId];
    set(carouselOrderAtom, (prevMap) => ({
      ...prevMap,
      [questionId]: !prev,
    }));
  },
});

const hasRespondedAtom = atom({
  key: 'hasRespondedAtom',
  default: {},
});

const response = atom({ key: 'response', default: {} });

const responseSelector = selectorFamily({
  key: 'responseSelector',
  get: (questionId) => ({ get }) => get(response)[questionId] || {},
  set: (questionId) => ({ set }, resObj) =>
    set(response, (prev) => ({ ...prev, [questionId]: resObj })),
});

const hasResponded = selectorFamily({
  key: 'hasResponded',
  get: (questionId) => ({ get }) => {
    if (get(role) === 'TEACHER') return true;
    return !!get(hasRespondedAtom)[questionId];
  },
  set: ({ set }, questionId) =>
    set(hasRespondedAtom, (prevMap) => ({
      ...prevMap,
      [questionId]: true,
    })),
});

const handleResponse = selector({
  key: 'handleResponse',
  set: ({ set, get }, { questionId, obj }) => {
    if (get(hasResponded(questionId))) return;
    set(hasResponded, questionId);
    set(responseSelector, {
      [questionId]: { ...obj, respondTimestamp: new Date().toISOString() },
    });
    set(carouselOrder, questionId);
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
const builderAnswer = atom({ key: 'builderAnswer', default: typeMap.MCQ[1] });
const builderMeta = atom({ key: 'builderMeta', default: typeMap.MCQ[0] });

const questionType = selector({
  key: 'questionType',
  get: ({ get }) => get(builderType),
  set: ({ set }, newVal) => {
    set(builderAnswer, typeMap[newVal][1]);
    set(builderMeta, typeMap[newVal][0]);
    set(builderType, newVal);
  },
});

export default {
  meetData,
  isDrawerOpen,
  questions,
  questionIds,
  questionSelector,
  carouselOrderAtom,
  carouselOrder,
  hasRespondedAtom,
  response,
  responseSelector,
  handleResponse,
  role,
  isUploaderOpen,
  questionType,
  builderAnswer,
  builderMeta,
  hasResponded,
};
