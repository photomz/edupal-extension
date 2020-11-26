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

const isVisible = atom({
  key: 'isVisible',
  default: true,
});

const isDrawerOpen = atom({ key: 'isDrawerOpen', default: false });

const questions = atom({ key: 'questions', default: [] });

const addQuestion = selector({
  key: 'addQuestion',
  get: ({ get }) => get(questions),
  set: ({ set }, newValue) => set(questions, (prev) => prev.concat([newValue])),
});

const numQuestions = selector({
  key: 'numQuestions',
  get: ({ get }) => get(questions).length,
});

const flashcardFlipStates = atom({ key: 'flashcardFlipStates', default: {} });

// TODO: Migrate to selectorFamily which supports get arguments
const flipFlashcard = selector({
  key: 'flipFlashcard',
  get: ({ get }) => get(flashcardFlipStates),
  // Toggle flipping for flashcard, by questionId key
  set: ({ set, get }, questionId) => {
    const prev = get(flashcardFlipStates)[questionId];
    set(flashcardFlipStates, (prevMap) => ({
      ...prevMap,
      [questionId]: !prev,
    }));
  },
});

const questionResponseStates = atom({
  key: 'questionResponseStates',
  default: {},
});

const flipResponse = selector({
  key: 'flipResponse',
  get: ({ get }) => get(questionResponseStates),
  set: ({ set }, questionId) =>
    set(questionResponseStates, (prevMap) => ({
      ...prevMap,
      [questionId]: true,
    })),
});

const response = atom({ key: 'response', default: {} });

const responseSelector = selector({
  key: 'responseSelector',
  get: ({ get }) => get(response),
  set: ({ set }, resObj) => set(response, (prev) => ({ ...prev, ...resObj })),
});

const respondTimestamp = atom({ key: 'respondTimestamp', default: {} });

const respondTimestampSelector = selector({
  key: 'respondTimestampSelector',
  get: ({ get }) => get(respondTimestamp),
  set: ({ set }, resObj) =>
    set(respondTimestamp, (prev) => ({ ...prev, ...resObj })),
});

const hasResponded = selectorFamily({
  key: 'hasResponded',
  get: (questionId) => ({ get }) => {
    if (get(role) === 'TEACHER') return true;
    return get(questionResponseStates)[questionId];
  },
});

const handleResponse = selector({
  key: 'handleResponse',
  set: ({ set, get }, { questionId, obj }) => {
    if (get(hasResponded(questionId))) return;
    set(flipResponse, questionId);
    set(responseSelector, { [questionId]: obj });
    set(respondTimestampSelector, { [questionId]: new Date().toISOString() });
    set(flipFlashcard, questionId);
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
  isVisible,
  isDrawerOpen,
  questions,
  addQuestion,
  numQuestions,
  flashcardFlipStates,
  flipFlashcard,
  questionResponseStates,
  flipResponse,
  response,
  responseSelector,
  respondTimestamp,
  respondTimestampSelector,
  handleResponse,
  role,
  isUploaderOpen,
  questionType,
  builderAnswer,
  builderMeta,
  hasResponded,
};
