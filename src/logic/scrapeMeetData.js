import Util from '../util';
import mockData from './data.json';

const scrapeMeetData = () => {
  const dataScript = Util.contains('script', "key: 'ds:8'");
  if (!dataScript[0]) {
    if (Util.isDev || process.env.REACT_APP_DEBUG) return mockData;
    throw new Error('Edu-pal - Could not find user Google Meet data');
  }
  const wizFunctionCall = dataScript[0].text;
  const wizRawDataArr = wizFunctionCall.match(
    /\[((.|\n)*?\[(.|\n)*?\])(.|\n)*?\]/ // Exclusively match multiline nested array.
    // 1D array matching will result in unclosed brackey, invalid JSON
  )[0];
  const wizData = JSON.parse(wizRawDataArr);
  return {
    meetingId: document
      .querySelector('[data-unresolved-meeting-id]')
      .getAttribute('data-unresolved-meeting-id'),
    name: wizData[6].split(' ')[0],
    lastName: wizData[6].split(' ')[1],
    team: wizData[28],
    avatar: wizData[5],
    email: wizData[4],
    userId: wizData[15],
  };
};

export default scrapeMeetData;
