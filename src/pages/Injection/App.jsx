/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useWebsocket from 'react-use-websocket';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import MuiButton from '@material-ui/core/Button';
import Mixpanel from '../../logic/mixpanelParams';

import ShortAppBar from '../../containers/ShortAppBar';
import Sidebar from '../../containers/Sidebar';
import QuestionSnack from '../../containers/Snackbar/QuestionSnack';

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
  receiveUpdateRole,
  signUpDate as userSignUpDate,
} from '../../logic/common';
import { receiveRespondAction } from '../../logic/snackbar';
import { peopleSet, track } from '../../logic/mixpanel';

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
  const signUpDate = useRecoilValue(userSignUpDate);

  const mixpanelPeopleSet = useSetRecoilState(peopleSet);
  const mixpanelTrack = useSetRecoilState(track);
  const [connect, setConnect] = useState(true);
  const { sendJsonMessage, readyState, lastJsonMessage } = useWebsocket(
    g.socketUrl,
    {},
    connect
  );

  useEffect(() => {
    mixpanelPeopleSet();
    if (new Date() - new Date(signUpDate) < 1000 * 60 * 2)
      mixpanelTrack('New User', {
        signUpDate,
        name: meet.name,
      });
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  const addQuestion = useSetRecoilState(receiveAsk);
  const addResponse = useSetRecoilState(receiveRespond);
  const addAnswer = useSetRecoilState(receiveAnswer);
  const setLeaderboard = useSetRecoilState(leaderboard);
  const updateRole = useSetRecoilState(receiveUpdateRole);
  const handleRespond = useSetRecoilState(receiveRespondAction);

  useEffect(() => {
    console.info(lastJsonMessage);
    if (lastJsonMessage === null) return;
    const { action, data } = lastJsonMessage;
    switch (action) {
      case 'receiveAsk':
        enqueueSnackbar('New Question', {
          content: (key, message) => (
            <QuestionSnack key={key} message={message} qid={data.questionId} />
          ),
        });
        addQuestion(data);
        break;
      case 'receiveResponse':
        enqueueSnackbar(`${data.student.name} answered a question!`, {
          variant: 'info',
          action: (
            <MuiButton onClick={() => handleRespond(data.questionId)}>
              More
            </MuiButton>
          ),
        });
        addResponse(data);
        break;
      case 'receiveLeaderboard':
        setLeaderboard(data);
        break;
      case 'receiveAnswer':
        addAnswer(data);
        break;
      case 'joinMeetingSuccess':
        console.info('You are connected to Edu-pal!');
        Mixpanel.track('Join Meeting', {
          meetingId: meet.meetingId,
          role: userRole,
        });
        break;
      case 'joinMeetingFailed':
        enqueueSnackbar(
          `Joining as teacher failed. Please join as student or ask ${data.culprit} to become a student and reconnect.`,
          { variant: 'warning' }
        );
        break;
      case 'updateRoleFailed':
        console.log(data);
        enqueueSnackbar(
          `Your cannot be teacher because ${data.culprit} is currently the teacher.`,
          { variant: 'error' }
        );
        break;
      case 'updateRoleSuccess':
        enqueueSnackbar(`You are now a ${data.newRole.toLowerCase()}!`, {
          variant: 'success',
        });
        updateRole(data);
        break;
      default:
        // eslint-disable-next-line no-console
        console.info(lastJsonMessage);
        break;
    }
  }, [lastJsonMessage]);

  const appbarRef = useRef(null);
  const sidebarRef = useRef(null);

  Util.useOutsideClick([appbarRef, sidebarRef], uploaderOpen, () =>
    setDrawerOpen(false)
  );

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
