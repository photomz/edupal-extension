/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useWebsocket from 'react-use-websocket';
import styled from 'styled-components';

import ShortAppBar from '../../containers/ShortAppBar';
import Sidebar from '../../containers/Sidebar';

import Util from '../../util';
import g from '../../global';
import { receiveAsk } from '../../logic/question';
import { receiveAnswer } from '../../logic/response';
import { receiveRespond } from '../../logic/stats';
import {
  isUploaderOpen,
  isDrawerOpen,
  fireMessage,
  meetData,
  role,
  leaderboard,
} from '../../logic/common';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
`;

const App = () => {
  const uploaderOpen = useRecoilValue(isUploaderOpen);
  const setDrawerOpen = useSetRecoilState(isDrawerOpen);
  const socketMessage = useRecoilValue(fireMessage);
  const meet = useRecoilValue(meetData);
  const userRole = useRecoilValue(role);

  const [connect, setConnect] = useState(false);
  const { sendJsonMessage, readyState, lastJsonMessage } = useWebsocket(
    g.socketUrl,
    {},
    connect
  );

  const appbarRef = useRef(null);
  const sidebarRef = useRef(null);

  const addQuestion = useSetRecoilState(receiveAsk);
  const addResponse = useSetRecoilState(receiveRespond);
  const addAnswer = useSetRecoilState(receiveAnswer);
  const setLeaderboard = useSetRecoilState(leaderboard);

  useEffect(() => {
    console.info(lastJsonMessage);
    if (lastJsonMessage === null) return;
    const { action, data } = lastJsonMessage;
    switch (action) {
      case 'receiveAsk':
        addQuestion(data);
        break;
      case 'receiveResponse':
        addResponse(data);
        break;
      case 'receiveLeaderboard':
        setLeaderboard(data);
        break;
      case 'response':
        // eslint-disable-next-line no-console
        console.info(lastJsonMessage);
        break;
      case 'receiveAnswer':
        addAnswer(data);
        break;
      default:
        // eslint-disable-next-line no-console
        console.info(lastJsonMessage);
        break;
    }
  }, [lastJsonMessage]);

  Util.useOutsideClick([appbarRef, sidebarRef], uploaderOpen, () =>
    setDrawerOpen(false)
  );

  // Websocket init
  useEffect(() => {
    setConnect(true);
    console.log('Edu-pal Google Meet Extension has started up.');
  }, []);

  useEffect(() => console.info('Socket state:', readyState), [readyState]);

  // Send ping to keep socket connection open
  useEffect(() => {
    const keepAlive = setInterval(() => {
      sendJsonMessage({ route: 'ping' });
    }, 60000 * 9);
    return clearInterval(keepAlive);
  }, []);

  useEffect(() => {
    if (!meet.meetingId) return;
    const { meetingId, userId, name, avatar } = meet;
    sendJsonMessage({
      route: 'joinMeeting',
      data: { meetingId, role: userRole, userId, name, avatar },
    });
  }, [meet]);

  useEffect(() => {
    console.info(socketMessage);
    sendJsonMessage(socketMessage);
  }, [socketMessage]);

  useEffect(() => {
    (async () => {
      const { meetingId, userId, name } = meet;
      const disconnectPayload = {
        route: 'disconnect',
        data: {
          meetingId,
          role: userRole,
          userId,
          classId: 'null', // TODO: Backend requires strict typing of null
          name,
        },
      };
      document.addEventListener('beforeunload', () => {
        sendJsonMessage(disconnectPayload);
        console.info('Safely disconnected from Edu-pal socket connections.');
      });

      // wait for meet to relay call ended message
      while (document.querySelector("[data-call-ended='true']") == null) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 200));
      }
      sendJsonMessage(disconnectPayload);
      console.info('Safely disconnected from Edu-pal socket connections');
      setConnect(false);
    })();
  }, []);

  if (!connect) return <></>;

  return (
    <Container>
      <ShortAppBar ref={appbarRef} />
      <Sidebar ref={sidebarRef} />
    </Container>
  );
};

export default hot(module)(App);
