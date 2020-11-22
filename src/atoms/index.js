import { atom, selector } from 'recoil';

const meetData = atom({
  key: 'meetData',
  default: {},
});

const isVisible = atom({
  key: 'isVisible',
  default: true,
});

const hands = atom({ key: 'hands', default: [] });

const messages = atom({ key: 'messages', default: [] });

const isDropdownOpen = atom({ key: 'isDropdownOpen', default: false });

const isUpdateAvailable = atom({
  key: 'isUpdateAvailable',
  default: false,
});

const hasCheckedUpdate = atom({ key: 'hasCheckedUpdate', default: false });

const emojiTone = atom({ key: 'emojiTone', default: 0 });

const isFullName = atom({ key: 'fullName', default: '' });

const handsSelector = selector({
  key: 'handsSelector',
  get: ({ get }) => get(hands),
  set: ({ get, set }, { action, data }) => {
    switch (action) {
      case 'add':
        set(hands, get(hands).unshift(data));
        break;
      case 'remove':
        set(
          hands,
          get(hands).filter((hand) => hand.messageId !== data)
        );
        break;
      default:
        break;
    }
  },
});

const messagesSelector = selector({
  key: 'messagesSelector',
  get: ({ get }) => get(messages),
  set: ({ get, set }, { action, data }) => {
    switch (action) {
      case 'add':
        set(messages, get(messages).unshift(data));
        setTimeout(
          () => set(messagesSelector, { action: 'remove', data }),
          3000
        );
        break;
      case 'remove':
        set(
          messages,
          get(messages).filter((hand) => hand.messageId !== data)
        );
        break;
      default:
        break;
    }
  },
});

export default {
  meetData,
  isVisible,
  handsSelector,
  messagesSelector,
  isDropdownOpen,
  hasCheckedUpdate,
  emojiTone,
  isUpdateAvailable,
  isFullName,
};
