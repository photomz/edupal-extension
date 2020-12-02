import scrapeMeetData from './scrapeMeetData';

const get = (key) => {
  const value = localStorage.getItem(`edupal__${key}`);
  return value === null ? undefined : JSON.parse(value);
};
const reset = window.localStorage.clear.bind(localStorage);

const resetState = ({ set }) => {
  // Only reset if user changes meetings
  const value = get('meetData');
  if (value === undefined || value.meetingId === scrapeMeetData().meetingId) {
    set({ key: 'meetData' }, scrapeMeetData());
    localStorage.setItem('edupal__meetData', JSON.stringify(scrapeMeetData()));
    return;
  }

  const qids = get('questionIds');
  if (!Array.isArray(qids)) return;

  qids.forEach((qid) => {
    reset(`questions__${qid}`);
    reset(`iHaveResponded__${qid}`);
    reset(`myResponse__${qid}`);
  });

  reset(`questionIds`);
  reset(`creatorImage`);
  reset('creatorType');
  reset('creatorText');
  ['MCQ', 'ShortAnswer', 'MultiSelect', 'TrueFalse'].forEach((type) => {
    reset(`creatorMeta__${type}`);
    reset(`creatorAnswer__${type}`);
  });
};

export default resetState;
