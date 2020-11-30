import { atom, atomFamily, selector } from 'recoil';
import mockMeetData from './data.json';
import scrapeMeetData from './scrapeMeetData';

const signUpDate = atom({
  key: 'signUpDate',
  default: new Date().toISOString(),
  persistence_UNSTABLE: {
    type: 'signUpDate',
  },
});
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

const sendUpdateRole = selector({
  key: 'sendUpdateRole',
  set: ({ set, get }, newRole) => {
    const { meetingId, userId, name, avatar } = get(meetData);
    const payload = {
      route: 'updateRole',
      data: {
        prevRole: get(role),
        newRole,
        meetingId,
        userId,
        name,
        avatar,
      },
    };
    set(fireMessage, payload);
  },
});

const receiveUpdateRole = selector({
  key: 'receiveUpdateRole',
  set: ({ set }, { newRole }) => {
    set(role, newRole);
    set(tabOrder, newRole === 'TEACHER' ? 3 : newRole === 'STUDENT' && 2);
  },
});

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
  sendUpdateRole,
  receiveUpdateRole,
  signUpDate,
};
