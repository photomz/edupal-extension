import { selector } from 'recoil';
import { questions, questionIds } from './question';
import { iHaveResponded, myResponse } from './response';
import {
  creatorType,
  creatorImage,
  creatorText,
  creatorAnswer,
  creatorMeta,
} from './create';
import { meetData } from './common';
import scrapeMeetData from './scrapeMeetData';

const resetAsNeeded = selector({
  key: 'resetAsNeeded',
  set: ({ get, reset }) => {
    // Only reset if user changes meetings
    if (meetData.meetingId === scrapeMeetData.meetingId) return;
    const qids = get(questionIds);
    qids.forEach((qid) => {
      reset(questions(qid));
      reset(iHaveResponded(qid));
      reset(myResponse(qid));
    });
    reset(questionIds);

    reset(creatorImage);
    reset(creatorType);
    reset(creatorText);
    ['MCQ', 'ShortAnswer', 'MultiSelect', 'TrueFalse'].forEach((type) => {
      reset(creatorMeta(type));
      reset(creatorAnswer(type));
    });
  },
});

export default {};
export { resetAsNeeded };
