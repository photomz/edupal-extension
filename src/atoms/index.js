import { atom, selector } from 'recoil';
import mockMeetData from './data.json';

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

const handleResponse = selector({
  key: 'handleResponse',
  set: ({ set }, { questionId, obj }) => {
    set(flipResponse, questionId);
    set(responseSelector, { [questionId]: obj });
    set(respondTimestampSelector, { [questionId]: new Date().toISOString() });
    set(flipFlashcard, questionId);
  },
});

const role = atom({
  key: 'role',
  default: 'STUDENT',
  persistence_UNSTABLE: {
    type: 'role',
  },
});

const isUploaderOpen = atom({ key: 'isUploaderOpen', default: false });

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
};
