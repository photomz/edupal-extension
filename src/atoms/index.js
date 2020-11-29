import { atom, selector, selectorFamily, atomFamily } from 'recoil';
import { nanoid } from 'nanoid';
import mockMeetData from './data.json';
import g from '../global';
import Util from '../util';

const role = atom({
  key: 'role',
  default: 'STUDENT',
  persistence_UNSTABLE: {
    type: 'role',
  },
});
const fireMessage = atom({ key: 'fireMessage', default: '' });

const scrapeMeetData = () => {
  const dataScript = Util.contains('script', 'accounts.google.com');
  if (!dataScript[1] && process.env.NODE_ENV === 'development') return null;
  const userData = JSON.parse(dataScript[1].text.match(/\[(.*?)\]/)[0]);
  return {
    meetingId: document
      .querySelector('[data-unresolved-meeting-id]')
      .getAttribute('data-unresolved-meeting-id'),
    name: userData[6].split(' ')[0],
    fullName: userData[6],
    team: userData[28],
    avatar: userData[5],
    email: userData[4],
    userId: userData[15],
  };
};

const normaliseResponse = (texts, res) => {
  let responseText;
  switch (typeof res) {
    case 'boolean':
      responseText = Util.capitalise([res.toString()]);
      break;
    case 'number':
      responseText =
        texts && texts.options ? [texts.options[res]] : [g.alphabet[res][0]];
      break;
    case 'object':
      responseText =
        texts && texts.options
          ? texts.options.filter((_, i) => res[i])
          : [
              res
                .map((num) => g.alphabet[num][0])
                .reduce((p, c) => `${p}, ${c}`, ''),
            ];
      break;
    case 'string':
      responseText = [res];
      break;
    default:
      throw new Error('Unexpected response type');
  }
  return responseText;
};

const meetData = atom({
  key: 'meetData',
  default:
    process.env.NODE_ENV === 'development'
      ? mockMeetData
      : process.env.NODE_ENV === 'production' && scrapeMeetData(),
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
  set: ({ set, get }, { questionId, ...rest }) => {
    const texts = get(questions(questionId)).meta;
    set(responses(questionId), (prev) =>
      prev.concat({
        responseText: normaliseResponse(texts, rest.response),
        ...rest,
      })
    );
    set(responseStudentIds(questionId), (prev) => prev.concat(rest.student.id));
  },
});
const responseSpeed = selectorFamily({
  key: 'responseSpeed',
  get: (questionId) => ({ get }) => {
    const { askTimestamp } = get(questions(questionId));
    const times = get(responses(questionId)).map(
      ({ respondTimestamp }) =>
        (new Date(respondTimestamp) - new Date(askTimestamp)) / 1000
    );
    const avgTime = Math.round(
      times.reduce((prev, curr) => prev + curr, 0) / times.length
    );
    return avgTime || 0;
  },
});

// TODO: Create websocket route to GET
const numStudents = atom({
  key: 'numStudents',
  default: 5,
});

const answers = atomFamily({ key: 'answers', default: null });

const optionBar = selectorFamily({
  key: 'selectedOptionRate',
  get: ({ questionId, option }) => ({ get }) => {
    const numSelected = get(responses(questionId)).reduce(
      (selected, { response }) =>
        selected +
        !!(
          (Array.isArray(response) && response[option]) ||
          response === option
        ),
      0
    );
    const percent = Math.round((100 * numSelected) / get(numStudents));
    const answer = get(answers(questionId));
    const isCorrect =
      answer === null
        ? null
        : (Array.isArray(answer) && answer[option]) || answer === option;
    return { numSelected, percent, isCorrect };
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

const studentAnswer = atomFamily({
  key: 'studentAnswers',
  default: {},
});

const addAnswer = selector({
  key: 'addAnswer',
  set: ({ set, get }, { questionId, ...obj }) => {
    const answerText = normaliseResponse(
      get(questions(questionId)).meta,
      obj.answer
    );
    set(studentAnswer(questionId), {
      answerText,
      ...obj,
    });
  },
});

const sendRespond = selectorFamily({
  key: 'sendRespond',
  set: (questionId) => ({ set, get }, obj) => {
    if (get(iHaveResponded(questionId))) return;
    set(iHaveResponded(questionId), true);
    set(carouselOrder(questionId), 1);

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
        questionId: question.questionId,
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

const tabOrder = atom({ key: 'tabOrder', default: 0 });
const reportQuestion = atom({ key: 'reportQuestion', default: '' });
const goToReport = selectorFamily({
  key: 'goToReport',
  set: (questionId) => ({ set }) => {
    set(tabOrder, 4);
    set(reportQuestion, questionId);
  },
});

const loadingAnswer = atomFamily({ key: 'loadingAnswer', default: false });

const leaderboard = atom({ key: 'leaderboard', default: [] });

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
        image: get(creatorImage),
        text: get(creatorText),
      },
      meta: get(creatorMeta(type)),
      askTimestamp: new Date().toISOString(),
      questionId,
    };

    set(addQuestion, question);

    set(fireMessage, {
      route: 'ask',
      data: {
        classId: null,
        meetingId,
        answer,
        ...question,
      },
    });
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
  sendRespond,
  role,
  isUploaderOpen,
  creatorType,
  creatorAnswer,
  creatorMeta,
  creatorImage,
  iHaveResponded,
  responses,
  responseStudentIds,
  addResponse,
  optionBar,
  numStudents,
  answers,
  responseSpeed,
  tabOrder,
  reportQuestion,
  goToReport,
  loadingAnswer,
  fireMessage,
  leaderboard,
  studentAnswer,
  addAnswer,
  sendAsk,
  creatorText,
};
