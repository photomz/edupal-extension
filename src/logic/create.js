import { atom, atomFamily, selector } from 'recoil';
import { nanoid } from 'nanoid';
import { meetData, queueMessage } from './common';
import { answers } from './stats';
import { receiveAsk } from './question';
import { track } from './mixpanel';
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
    const meta = Util.deepClone(get(creatorMeta(type)));
    if (
      ['MultiSelect', 'MCQ'].includes(type) &&
      meta.options.every((el) => el.trim() === '')
    ) {
      meta.options = null;
    }

    let answer = Util.deepClone(get(creatorAnswer(type)));
    if (type === 'MultiSelect') {
      answer = answer.slice(0, meta.optionNum);
      if (answer.every((tf) => tf === false)) answer = null;
    } else if (type === 'ShortAnswer' && answer.trim() === '') answer = null;

    const image = get(creatorImage) || null;
    const text = get(creatorText) || null;

    const payload = {
      teacher: {
        name,
        id: userId,
      },
      avatar,
      question: {
        type,
        image,
        text,
      },
      meta,
      askTimestamp: new Date().toISOString(),
      questionId,
    };

    set(receiveAsk, payload);
    set(answers(questionId), answer);
    set(queueMessage, {
      route: 'ask',
      data: {
        classId: 'null',
        meetingId,
        answer,
        ...payload,
      },
    });
    // Hacky fix for recoil bug where only second fireMessage actually is queued
    setTimeout(
      () =>
        set(track, {
          event: 'Ask Question',
          props: {
            name,
            questionId,
            meetingId,
            type,
            text,
            meta: JSON.stringify(meta),
            answer,
          },
        }),
      50
    );
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