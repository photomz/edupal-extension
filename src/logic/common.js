import { atom, atomFamily } from 'recoil';
import mockMeetData from './data.json';
import scrapeMeetData from './scrapeMeetData';

const role = atom({
  key: 'role',
  default: 'STUDENT',
  persistence_UNSTABLE: {
    type: 'role',
  },
});
const fireMessage = atom({ key: 'fireMessage', default: '' });

const meetData = atom({
  key: 'meetData',
  default:
    process.env.NODE_ENV === 'development'
      ? mockMeetData
      : process.env.NODE_ENV === 'production' && scrapeMeetData(),
});

const isDrawerOpen = atom({ key: 'isDrawerOpen', default: false });

const carouselOrder = atomFamily({ key: 'carouselOrder', default: 0 });

const isUploaderOpen = atom({ key: 'isUploaderOpen', default: false });

const tabOrder = atom({ key: 'tabOrder', default: 0 });

const leaderboard = atom({ key: 'leaderboard', default: [] });

export default {};
export {
  meetData,
  isDrawerOpen,
  carouselOrder,
  role,
  isUploaderOpen,
  tabOrder,
  fireMessage,
  leaderboard,
};
