import { atomFamily, selector, selectorFamily } from 'recoil';
import sanitiseResponse from './sanitiseResponse';
import {
  meetData,
  carouselOrder,
  queueMessage,
  isDrawerOpen,
  tabOrder,
} from './common';
import { questions } from './question';
import { track } from './mixpanel';
import { localStorageEffect } from './persist';

const iHaveResponded = atomFamily({
  key: 'iHaveResponded',
  default: false,
  effects_UNSTABLE: (id) => [
    localStorageEffect({ name: 'iHaveResponded', id }),
  ],
});

const myResponse = atomFamily({
  key: 'myResponse',
  default: {},
  effects_UNSTABLE: (id) => [localStorageEffect({ name: 'myResponse', id })],
});

const studentAnswer = atomFamily({
  key: 'studentAnswer',
  default: {},
  effects_UNSTABLE: (id) => [localStorageEffect({ name: 'studentAnswer', id })],
});

const loadingAnswer = atomFamily({ key: 'loadingAnswer', default: false });

const receiveAnswer = selector({
  key: 'receiveAnswer',
  set: ({ set, get }, { questionId, ...obj }) => {
    const answerText = sanitiseResponse(
      get(questions(questionId)).meta,
      obj.answer
    );
    set(studentAnswer(questionId), {
      answerText,
      ...obj,
    });
    set(loadingAnswer(questionId), false);
  },
});

const sendRespond = selectorFamily({
  key: 'sendRespond',
  set: (questionId) => ({ set, get }, obj) => {
    if (get(iHaveResponded(questionId))) return;
    set(iHaveResponded(questionId), true);
    set(isDrawerOpen, true);
    set(tabOrder, 0);
    set(carouselOrder(questionId), 1);
    set(loadingAnswer(questionId), true);

    const response = obj;
    const respondTimestamp = new Date().toISOString();
    set(myResponse(questionId), {
      response,
      respondTimestamp,
    });

    const { avatar, name, userId, meetingId } = get(meetData);
    const { answerCrypt, askTimestamp } = get(questions(questionId));
    const payload = {
      route: 'respond',
      data: {
        student: {
          name,
          id: userId,
        },
        answerCrypt,
        avatar,
        questionId,
        meetingId,
        classId: 'null', // TODO: Class join show get UI UX in V2
        response,
        askTimestamp,
        respondTimestamp,
      },
    };
    set(queueMessage, payload);
    setTimeout(
      () =>
        set(track, {
          event: 'Respond to Question',
          props: {
            meetingId,
            name,
            questionId,
            response: JSON.stringify(response),
          },
        }),
      50
    );
  },
});

export default {};
export {
  iHaveResponded,
  myResponse,
  studentAnswer,
  receiveAnswer,
  sendRespond,
  loadingAnswer,
};
