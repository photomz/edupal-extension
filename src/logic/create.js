import { atom, atomFamily, selector } from 'recoil';
import { nanoid } from 'nanoid';
import { meetData, fireMessage } from './common';
import { answers } from './stats';
import { receiveAsk } from './question';
import Util from '../util';

const typeMap = {
  MCQ: [{ optionNum: 4, options: ['', '', '', '', ''] }, null],
  ShortAnswer: [{}, null],
  MultiSelect: [
    { optionNum: 4, options: ['', '', '', '', ''] },
    [false, false, false, false, false],
  ],
  TrueFalse: [{}, null],
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
    const meta = Util.deepClone(get(creatorMeta(type)));
    if (
      ['MultiSelect', 'MCQ'].includes(type) &&
      meta.options.every((el) => el === '')
    ) {
      meta.options = null;
    }

    let answer = Util.deepClone(get(creatorAnswer(type)));
    if (type === 'MultiSelect') {
      answer = answer.slice(0, meta.optionNum);
      if (answer.every((tf) => tf === false)) answer = null;
    } else if (type === 'ShortAnswer' && answer === '') answer = null;

    console.log(Object.keys(typeMap).map((el) => get(creatorAnswer(el))));
    console.log(Object.keys(typeMap).map((el) => get(creatorMeta(el))));
    console.log(type, answer);

    const payload = {
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
      meta,
      askTimestamp: new Date().toISOString(),
      questionId,
    };

    set(receiveAsk, payload);
    set(answers(questionId), answer);
    set(fireMessage, {
      route: 'ask',
      data: {
        classId: 'null',
        meetingId,
        answer,
        ...payload,
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
