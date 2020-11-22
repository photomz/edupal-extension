import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useWebsockets from 'react-use-websocket';
import styled from 'styled-components';
import shortid from 'shortid';
import atoms from '../../atoms';
import global from '../../global';
import Message from './Message';
import Hand from './Hand';

const Wrapper = styled.span`
  position: fixed;
  bottom: 100px;
  left: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MessageWrapper = () => {
  const { lastJsonMessage } = useWebsockets(global.socketUrl);
  const [messages, mutateMessage] = useRecoilState(atoms.messagesSelector);
  const [hands, mutateHand] = useRecoilState(atoms.handsSelector);

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    if (lastJsonMessage === null || !lastJsonMessage.hasOwnProperty('message'))
      return;
    const m = lastJsonMessage.message;
    switch (lastJsonMessage.action) {
      case 'MESSAGE':
        mutateMessage({
          action: 'add',
          data: {
            messageId: m.messageId || shortid(),
            emoji: m.emoji,
            username: m.username,
            img: m.img,
            owner: false,
            tone: m.tone,
          },
        });
        break;
      case 'QUEUE':
        mutateHand({
          action: 'add',
          data: {
            messageId: m.messageId,
            text: m.text,
            img: m.img,
            owner: false,
            tone: m.tone,
          },
        });
        // TODO: Display Chrome notification
        break;
      case 'REMOVE':
        mutateHand({ action: 'remove', data: m.messageId });
        break;
      default:
        throw new Error('Unknown action');
    }
  }, [lastJsonMessage]);

  return (
    <Wrapper>
      {messages.map(({ messageId, emoji, username, img, tone }) => (
        <Message
          key={messageId}
          emojiId={emoji}
          username={username}
          avatar={img}
          tone={tone}
        />
      ))}
      {hands.map(({ messageId, text, img, tone }) => (
        <Hand
          key={messageId}
          text={text}
          tone={tone}
          avatar={img}
          messageId={messageId}
        />
      ))}
    </Wrapper>
  );
};

export default MessageWrapper;
