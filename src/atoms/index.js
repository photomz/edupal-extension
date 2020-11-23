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

// const hands = atom({ key: 'hands', default: [] });

// const messages = atom({ key: 'messages', default: [] });

// const isReactionsDropdownOpen = atom({
//   key: 'isReactionsDropdownOpen',
//   default: false,
// });

// const isSettingsDropdownOpen = atom({
//   key: 'isSettingsDropdownOpen',
//   default: false,
// });

// const isUpdateAvailable = atom({
//   key: 'isUpdateAvailable',
//   default: false,
// });

// const hasCheckedUpdate = atom({ key: 'hasCheckedUpdate', default: false });

// const emojiTone = atom({ key: 'emojiTone', default: 0 });

// const isFullName = atom({ key: 'fullName', default: '' });

// const myHandsSelector = selector({
//   key: 'myHandsSelector',
//   get: ({ get }) => get(hands).filter(({ owner }) => owner),
// });

// const myMessagesSelector = selector({
//   key: 'myMessagesSelector',
//   get: ({ get }) => get(hands).filter(({ owner }) => owner),
// });

// const preferredNameSelector = selector({
//   key: 'preferredNameSelector',
//   get: ({ get }) =>
//     get(isFullName) ? get(meetData).fullName : get(meetData).name,
// });

// const handsSelector = selector({
//   key: 'handsSelector',
//   get: ({ get }) => get(hands),
//   set: ({ set }, { action, data }) => {
//     switch (action) {
//       case 'add':
//         set(hands, (prev) => [data].concat(prev));
//         break;
//       case 'remove':
//         set(hands, (prev) => prev.filter((hand) => hand.messageId !== data));
//         break;
//       default:
//         break;
//     }
//   },
// });

// const messagesSelector = selector({
//   key: 'messagesSelector',
//   get: ({ get }) => get(messages),
//   set: ({ set }, { action, data }) => {
//     switch (action) {
//       case 'add':
//         set(messages, (prev) => [data].concat(prev));
//         setTimeout(
//           () => set(messagesSelector, { action: 'remove', data }),
//           3000
//         );
//         break;
//       case 'remove':
//         set(messages, (prev) => prev.filter((hand) => hand.messageId !== data));
//         break;
//       default:
//         break;
//     }
//   },
// });

// const areDropdownsOpen = selector({
//   key: 'areDropdownsOpen',
//   get: ({ get }) => get(isReactionsDropdownOpen) || get(isSettingsDropdownOpen),
// });

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
  // handsSelector,
  // messagesSelector,
  // isReactionsDropdownOpen,
  // isSettingsDropdownOpen,
  // hasCheckedUpdate,
  // emojiTone,
  // isUpdateAvailable,
  // isFullName,
  // myHandsSelector,
  // preferredNameSelector,
  // myMessagesSelector,
  // areDropdownsOpen,
};
