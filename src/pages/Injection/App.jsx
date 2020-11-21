import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import Util from '../../util';
import atoms from '../../atoms';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
`;

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [meetData, setMeetData] = useRecoilState(atoms.meetData);
  const [, setIsVisible] = useRecoilState(atoms.isVisible);

  useEffect(() => {
    const dataScript = Util.contains('script', 'accounts.google.com');
    const userData = JSON.parse(dataScript[1].text.match(/\[(.*?)\]/)[0]);
    if (!document) throw new Error('Document object is unreachable');
    const googleMeetUserData = {
      meetingID: document
        .querySelector('[data-unresolved-meeting-id]')
        .getAttribute('data-unresolved-meeting-id'),
      name: userData[6].split(' ')[0],
      fullName: userData[6],
      team: userData[28],
      avatar: userData[5],
      email: userData[4],
      userId: userData[15],
    };
    setMeetData(googleMeetUserData);
  }, []);

  useEffect(() => {
    // Connect to websocket
    // eslint-disable-next-line no-constant-condition
    if (true) {
      // if websocket loaded
      setIsConnected(true);
    }

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

  // Setinterval ping websocket
  useEffect(() => {}, []);

  useEffect(() => {
    if (!document) return;
    document.addEventListener('visibilitychange', () => {
      setIsVisible(document.visibilityState !== 'hidden');
    });
  }, []);

  useEffect(() => {
    (async () => {
      document.addEventListener('beforeunload', () => {
        // Wbs disconnect
      });

      // wait for meet to relay call ended message
      while (document.querySelector("[data-call-ended='true']") == null) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 200));
      }
      setIsConnected(false);
      // Wbs disconnect and close
    })();
  }, [meetData]);

  if (!isConnected) return <></>;

  return (
    <Container>
      <ReactionTray />
      <MessageWrapper />
    </Container>
  );
};

export default App;
