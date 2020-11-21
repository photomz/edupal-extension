/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import useWebsocket from 'react-use-websocket';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import global from '../../global';
import Util from '../../util';
import atoms from '../../atoms';

import MessageWrapper from '../../components/MessageWrapper';
import ReactionTray from '../../components/ReactionTray';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
`;

const scrapeMeetData = () => {
  const dataScript = Util.contains('script', 'accounts.google.com');
  const userData = JSON.parse(dataScript[1].text.match(/\[(.*?)\]/)[0]);
  if (!document) throw new Error('Document object is unreachable');
  return {
    meetingId: document
      .querySelector('[data-unresolved-meeting-id]')
      .getAttribute('data-unresolved-meeting-id'),
    name: userData[6].split(' ')[0],
    fullName: userData[6],
    team: userData[28],
    avatar: userData[5],
    email: userData[4],
    userId: userData[15],
  };
};

const App = () => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const { sendJsonMessage } = useWebsocket(
    global.socketUrl,
    {},
    isSocketConnected
  );
  const [meetData, setMeetData] = useRecoilState(atoms.meetData);
  const [, setIsVisible] = useSetRecoilState(atoms.isVisible);

  // Get user data
  useEffect(() => setMeetData(scrapeMeetData()), []);

  // Websocket init
  useEffect(() => {
    setIsSocketConnected(true);
    sendJsonMessage({
      route: 'join',
      data: {
        id: meetData.meetingId,
        team: meetData.team,
      },
    });
    // Send console message
    console.log(
      '%c Edu-pal Google Meet Extension has started up.',
      'background: #4D2F3C; color: #FBE2A0'
    );
    console.log(
      '%c Something gone wrong? Let us know - edupal.group@gmail.com',
      'background: #4D2F3C; color: #FBE2A0'
    );
  }, []);

  // Send ping to keep socket connection open
  useEffect(() => {
    const keepAlive = setInterval(() => {
      console.log('Keeping nod alive...');
      sendJsonMessage({ route: 'ping' });
    }, 60000 * 9);
    return clearInterval(keepAlive);
  }, []);

  useEffect(() => {
    if (!document) return;
    document.addEventListener('visibilitychange', () => {
      setIsVisible(document.visibilityState !== 'hidden');
    });
  }, []);

  useEffect(() => {
    (async () => {
      document.addEventListener('beforeunload', () => {
        sendJsonMessage({
          route: 'disconnect',
          data: { id: meetData.meetingId },
        });
        // TODO:  Wbs disconnect
      });

      // wait for meet to relay call ended message
      while (document.querySelector("[data-call-ended='true']") == null) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 200));
      }
      sendJsonMessage({
        route: 'disconnect',
        data: { id: meetData.meetingId },
      });
      setIsSocketConnected(false);
      // TODO: Wbs disconnect and close
    })();
  }, [meetData]);

  if (!isSocketConnected) return <></>;

  return (
    <Container>
      <ReactionTray />
      <MessageWrapper />
    </Container>
  );
};

export default App;
