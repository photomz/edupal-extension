/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useWebsocket from 'react-use-websocket';
import styled from 'styled-components';

import global from '../../global';
import ShortAppBar from '../../containers/ShortAppBar';
import Sidebar from '../../containers/Sidebar';
import a from '../../atoms';
import Util from '../../util';
import useSocketActions from '../../util/useSocketActions';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
`;

const App = () => {
  const [connect, setConnect] = useState(false);
  const { sendJsonMessage } = useWebsocket(global.socketUrl, {}, connect);
  const isUploaderOpen = useRecoilValue(a.isUploaderOpen);
  const setDrawerOpen = useSetRecoilState(a.isDrawerOpen);
  const fireMessage = useRecoilValue(a.fireMessage);
  const meetData = useRecoilValue(a.meetData);
  const role = useRecoilValue(a.role);
  useSocketActions();
  const appbarRef = useRef(null);
  const sidebarRef = useRef(null);

  Util.useOutsideClick([appbarRef, sidebarRef], isUploaderOpen, () =>
    setDrawerOpen(false)
  );

  // Websocket init
  useEffect(() => {
    setConnect(true);
    console.log('Edu-pal Google Meet Extension has started up.');
  }, []);

  // Send ping to keep socket connection open
  useEffect(() => {
    const keepAlive = setInterval(() => {
      sendJsonMessage({ route: 'ping' });
    }, 60000 * 9);
    return clearInterval(keepAlive);
  }, []);

  useEffect(() => {
    if (!meetData.meetingId) return;
    const { meetingId, userId, name } = meetData;
    sendJsonMessage({
      route: 'joinMeeting',
      data: { meetingId, role, userId, name },
    });
  }, [meetData]);

  useEffect(() => {
    console.info(fireMessage);
    sendJsonMessage(fireMessage);
  }, [fireMessage]);

  useEffect(() => {
    (async () => {
      const { meetingId, userId, name } = meetData;
      const disconnectPayload = {
        route: 'disconnect',
        data: {
          meetingId,
          role,
          userId,
          classId: null,
          name,
        },
      };
      document.addEventListener('beforeunload', () => {
        sendJsonMessage(disconnectPayload);
      });

      // wait for meet to relay call ended message
      while (document.querySelector("[data-call-ended='true']") == null) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 200));
      }
      sendJsonMessage(disconnectPayload);
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
