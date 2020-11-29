import { atom, atomFamily, selector } from 'recoil';
import { nanoid } from 'nanoid';
import { meetData, fireMessage } from './common';
import { answers } from './stats';
import { receiveAsk } from './question';

const typeMap = {
  MCQ: [{ optionNum: 4, options: ['', '', '', '', ''] }, 0],
  ShortAnswer: [{}, ''],
  MultiSelect: [
    { optionNum: 4, options: ['', '', '', '', ''] },
    [false, false, false, false, false],
  ],
  TrueFalse: [{}, false],
};

const creatorImage = atom({
  key: 'creatorImage',
  default: '',
  persistence_UNSTABLE: { type: 'creatorImage' },
});
const creatorType = atom({
  key: 'creatorType',
  default: 'MCQ',
  persistence_UNSTABLE: { type: 'creatorType' },
});
const creatorAnswer = atomFamily({
  key: 'creatorAnswer',
  default: (type) => typeMap[type][1],
  persistence_UNSTABLE: {
    type: 'creatorAnswer',
  },
});
const creatorMeta = atomFamily({
  key: 'creatorMeta',
  default: (type) => typeMap[type][0],
  persistence_UNSTABLE: {
    type: 'buildMeta',
  },
});
const creatorText = atom({
  key: 'creatorText',
  default: '',
  persistence_UNSTABLE: {
    type: 'creatorText',
  },
});

const sendAsk = selector({
  key: 'sendAsk',
  set: ({ set, get }) => {
    const { name, userId, avatar, meetingId } = get(meetData);
    const type = get(creatorType);
    const questionId = nanoid();
    const answer = get(creatorAnswer(type));
    set(answers(questionId), answer);
    const question = {
      teacher: {
        name,
        id: userId,
      },
      avatar,
      question: {
        type,
        image: get(creatorImage) || null,
        text: get(creatorText) || null,
      },
      meta: get(creatorMeta(type)),
      askTimestamp: new Date().toISOString(),
      questionId,
    };

    set(receiveAsk, question);

    set(fireMessage, {
      route: 'ask',
      data: {
        classId: 'null',
        meetingId,
        answer,
        ...question,
      },
    });
  },
});

export default {};
export {
  creatorImage,
  creatorType,
  creatorAnswer,
  creatorMeta,
  creatorText,
  sendAsk,
};
