import Util from '../util';

const scrapeMeetData = () => {
  const dataScript = Util.contains('script', 'accounts.google.com');
  if (!dataScript[1]) return null;
  const userData = JSON.parse(dataScript[1].text.match(/\[(.*?)\]/)[0]);
  return {
    meetingId: document
      .querySelector('[data-unresolved-meeting-id]')
      .getAttribute('data-unresolved-meeting-id'),
    name: userData[6].split(' ')[0],
    lastName: userData[6].split(' ')[1],
    team: userData[28],
    avatar: userData[5],
    email: userData[4],
    userId: userData[15],
  };
};

export default scrapeMeetData;
