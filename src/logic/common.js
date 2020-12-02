import { atom, atomFamily, selector } from 'recoil';
import scrapeMeetData from './scrapeMeetData';
import { localStorageEffect } from './persist';

const role = atom({
  key: 'role',
  default: 'STUDENT',
  effects_UNSTABLE: [localStorageEffect({ name: 'role' })],
});
const messages = atom({ key: 'messages', default: [] });
const queueMessage = selector({
  key: 'queueMessage',
  set: ({ set }, obj) => {
    set(messages, (prev) => prev.concat(obj));
  },
});
const dequeueMessage = selector({
  key: 'dequeueMessage',
  set: ({ set }) => {
    set(messages, (prev) => {
      const newQueue = [...prev];
      newQueue.shift();
      return newQueue;
    });
  },
});

const meetData = atom({
  key: 'meetData',
  default: scrapeMeetData(),
  effects_UNSTABLE: [localStorageEffect({ name: 'meetData' })],
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
    set(queueMessage, payload);
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
  messages,
  queueMessage,
  dequeueMessage,
  leaderboard,
  sendUpdateRole,
  receiveUpdateRole,
};
