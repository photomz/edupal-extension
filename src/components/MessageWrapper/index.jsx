/* global chrome */
import React, { useEffect } from 'react';
import useWebsockets from 'react-use-websocket';
import styled, { keyframes } from 'styled-components';
import shortid from 'shortid';
import global from '../../global';
import Util from '../../util';
import Message from './Message';
import Hand from './Hand';

const mount = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const unmount = keyframes`
	from {
		opacity: 1;
		margin-buttom: 0px;
	}
	to {
		opacity: 0;
		margin-buttom: 50px;
	}
`;

const Wrapper = styled.span`
  animation: ${({ isUnmounting }) => (isUnmounting ? unmount : mount)} 0.5s
    ease-in-out;
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

  useEffect(() => {
    const m = lastJsonMessage;
    switch (m.action) {
      case 'MESSAGE':
        this.$store.dispatch('addMessage', {
          messageId: m.messageId || shortid(),
          emoji: m.emoji,
          username: m.username,
          img: m.img,
          owner: false,
          tone: m.tone,
        });
        break;
      case 'QUEUE':
        this.$store.dispatch('addHand', {
          messageId: m.messageId,
          username: m.username,
          img: m.img,
          owner: false,
          tone: m.tone,
        });
        break;
      case 'REMOVE':
        this.$store.dispatch('removeHand', m.messageId);
        break;
      default:
        throw new Error('Unknown action');
    }
  }, [lastJsonMessage]);
};
