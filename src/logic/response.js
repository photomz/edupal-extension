import { atomFamily, selector, selectorFamily } from 'recoil';
import normaliseResponse from './normaliseResponse';
import { meetData, carouselOrder, fireMessage } from './common';
import { questions } from './question';

const iHaveResponded = atomFamily({
  key: 'iHaveResponded',
  default: false,
});

const myResponse = atomFamily({
  key: 'myResponse',
  default: {},
});

const studentAnswer = atomFamily({
  key: 'studentAnswers',
  default: {},
});

const loadingAnswer = atomFamily({ key: 'loadingAnswer', default: false });

const receiveAnswer = selector({
  key: 'receiveAnswer',
  set: ({ set, get }, { questionId, ...obj }) => {
    const answerText = normaliseResponse(
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
    set(carouselOrder(questionId), 1);
    set(loadingAnswer(questionId), true);

    const response = obj;
    const respondTimestamp = new Date().toISOString();
    set(myResponse(questionId), {
      response,
      respondTimestamp,
    });

    const user = get(meetData);
    const question = get(questions(questionId));
    const payload = {
      route: 'respond',
      data: {
        student: {
          name: user.name,
          id: user.userId,
        },
        answerCrypt: question.answerCrypt,
        avatar: user.avatar,
        questionId,
        meetingId: user.meetingId,
        classId: 'null', // TODO: Class join show get UI UX in V2
        response: JSON.stringify(response),
        askTimestamp: question.askTimestamp,
        respondTimestamp,
      },
    };
    set(fireMessage, payload);
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
