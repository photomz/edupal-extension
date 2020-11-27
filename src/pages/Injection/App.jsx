/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import useWebsocket from 'react-use-websocket';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import global from '../../global';
import Util from '../../util';
import a from '../../atoms';

import ShortAppBar from '../../containers/ShortAppBar';
import Sidebar from '../../containers/Sidebar';

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
  if (!dataScript[1] && process.env.NODE_ENV === 'development') return null;
  const userData = JSON.parse(dataScript[1].text.match(/\[(.*?)\]/)[0]);
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
  const [meetData, setMeetData] = useRecoilState(a.meetData);

  // Get user data
  useEffect(() => {
    const scraped = scrapeMeetData();
    if (scraped) setMeetData(scraped);
  }, []);

  // Websocket init
  useEffect(() => {
    setIsSocketConnected(true);
    // TODO: JoinMeeting
    // Send console message
    console.log('%c Edu-pal Google Meet Extension has started up.');
  }, []);

  // Send ping to keep socket connection open
  useEffect(() => {
    const keepAlive = setInterval(() => {
      console.log('Keeping Edu-pal alive...');
      sendJsonMessage({ route: 'ping' });
    }, 60000 * 9);
    return clearInterval(keepAlive);
  }, []);

  useEffect(() => {
    (async () => {
      document.addEventListener('beforeunload', () => {
        // TODO:  Wbs disconnect
      });

      // wait for meet to relay call ended message
      while (document.querySelector("[data-call-ended='true']") == null) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 200));
      }
      // sendJsonMessage({
      //   route: 'disconnect',
      //   data: { id: meetData.meetingId },
      // });
      setIsSocketConnected(false);
      // TODO: Wbs disconnect
    })();
  }, [meetData]);

  if (!isSocketConnected) return <></>;

  return (
    <Container>
      <ShortAppBar />
      <Sidebar />
    </Container>
  );
};

export default hot(module)(App);
