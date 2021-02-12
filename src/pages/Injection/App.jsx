/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
import useWebsocket from 'react-use-websocket';
import MuiButton from '@material-ui/core/Button';

import ShortAppBar from '../../containers/ShortAppBar';
import Sidebar from '../../containers/Sidebar';
import QuestionSnack from '../../containers/Snackbar/QuestionSnack';

import Util from '../../util';
import g from '../../global';
import { receiveAsk } from '../../logic/question';
import { receiveAnswer } from '../../logic/response';
import { receiveRespond, receiveNumStudents } from '../../logic/stats';
import {
  isUploaderOpen,
  isDrawerOpen,
  messages,
  dequeueMessage,
  meetData,
  role,
  leaderboard,
  receiveUpdateRole,
  sendUpdateRole,
} from '../../logic/common';
import { receiveRespondAction } from '../../logic/snackbar';
import {
  peopleSet,
  track,
  signUpDate as userSignUpDate,
} from '../../logic/mixpanel';

const SnackAction = styled(MuiButton)`
  color: ${({ theme }) => theme.palette.common.white};
`;

const App = () => {
  // const setMeetChat = useSetRecoilState(isMeetChatOpen);
  const uploaderOpen = useRecoilValue(isUploaderOpen);
  const setDrawerOpen = useSetRecoilState(isDrawerOpen);
  const socketMessage = useRecoilValue(messages);
  const dequeue = useSetRecoilState(dequeueMessage);
  const meet = useRecoilValue(meetData);
  const [userRole, setUserRole] = useRecoilState(role);
  const [signUpDate, setSignUpDate] = useRecoilState(userSignUpDate);

  const { enqueueSnackbar } = useSnackbar();
  const addQuestion = useSetRecoilState(receiveAsk);
  const addResponse = useSetRecoilState(receiveRespond);
  const addAnswer = useSetRecoilState(receiveAnswer);
  const setLeaderboard = useSetRecoilState(leaderboard);
  const updateRole = useSetRecoilState(receiveUpdateRole);
  const handleRespond = useSetRecoilState(receiveRespondAction);
  const switchRole = useSetRecoilState(sendUpdateRole);
  const setNumStudents = useSetRecoilState(receiveNumStudents);

  const mixpanelPeopleSet = useSetRecoilState(peopleSet);
  const mixpanelTrack = useSetRecoilState(track);
  const [connect, setConnect] = useState(true);
  const [reconnect, setReconnect] = useState(false);
  const { sendJsonMessage, readyState, lastJsonMessage } = useWebsocket(
    g.socketUrl,
    {
      shouldReconnect: () => connect,
      onClose: () => {
        if (connect)
          enqueueSnackbar(
            'Whoops! Edu-pal lost connection. We are trying again...',
            { variant: 'warning' }
          );
        setReconnect(true);
      },
      onOpen: () => {
        if (reconnect) {
          enqueueSnackbar('Edu-pal has reconnected!', { variant: 'success' });
          const { meetingId, userId, name, avatar } = meet;
          sendJsonMessage({
            route: 'joinMeeting',
            data: { meetingId, role: userRole, userId, name, avatar },
          });
        }
      },
    },
    connect
  );

  useEffect(() => {
    if (!meet.meetingId) return () => {};
    const { meetingId, userId, name, avatar } = meet;
    sendJsonMessage({
      route: 'joinMeeting',
      data: { meetingId, role: userRole, userId, name, avatar },
    });

    const keepAlive = setInterval(() => {
      Util.log('Keeping Edu-pal alive...');
      sendJsonMessage({ route: 'ping' });
    }, 60000 * 9);
    return clearInterval(keepAlive);
  }, []);

  useEffect(() => {
    if (lastJsonMessage === null) return;
    Util.log(lastJsonMessage);
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
            <SnackAction onClick={() => handleRespond(data.questionId)}>
              More
            </SnackAction>
          ),
        });
        addResponse(data);
        break;
      case 'receiveLeaderboard':
        setLeaderboard(data);
        break;
      case 'receiveAnswer':
        enqueueSnackbar(`Your teacher received your answer!`, {
          variant: 'success',
        });
        addAnswer(data);
        break;
      case 'numStudents':
        enqueueSnackbar(`Question sent successfully!`, {
          variant: 'success',
        });
        setNumStudents(data);
        break;
      case 'joinMeetingSuccess':
        // eslint-disable-next-line no-case-declarations
        const { role: receivedRole } = data;
        // eslint-disable-next-line no-case-declarations
        const otherRole = receivedRole === 'STUDENT' ? 'TEACHER' : 'STUDENT';
        enqueueSnackbar(
          `You joined Edu-pal as ${receivedRole.toLowerCase()}!`,
          {
            variant: 'info',
            action: (
              <SnackAction onClick={() => switchRole(otherRole)}>
                Switch
              </SnackAction>
            ),
          }
        );
        setUserRole(receivedRole);
        mixpanelTrack({
          event: 'Join Meeting',
          props: {
            meetingId: meet.meetingId,
            role: receivedRole,
          },
        });
        break;
      case 'updateRoleFailed':
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
        break;
    }
  }, [lastJsonMessage]);

  const appbarRef = useRef(null);
  const sidebarRef = useRef(null);

  Util.useOutsideClick([appbarRef, sidebarRef], uploaderOpen, () =>
    setDrawerOpen(false)
  );

  useEffect(() => {
    if (readyState !== 1) return;
    mixpanelPeopleSet({});
    if (signUpDate === '') {
      const now = new Date().toISOString();
      setSignUpDate(now);
      enqueueSnackbar(
        `Need help getting started? Check out our quick start guide!`,
        {
          variant: 'info',
          action: (
            <SnackAction
              onClick={() =>
                window.open('https://www.edu-pal.org/faq#getting-started')
              }
            >
              OK
            </SnackAction>
          ),
        }
      );
      // Hacky fix for recoil bug where only second fireMessage actually is queued
      setTimeout(() => {
        mixpanelTrack({
          event: 'New User',
          props: {
            signUpDate: now,
            name: meet.name,
          },
        });
      }, 100);
    }
  }, [readyState]);

  useEffect(() => {
    if (!socketMessage.length) return;
    const front = socketMessage[socketMessage.length - 1];
    Util.log(front);
    sendJsonMessage(front);
    dequeue();
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
          classId: 'null', // Backend requires strict typing of null
          name,
        },
      };
      document.addEventListener('beforeunload', (e) => {
        mixpanelTrack({ event: 'Leave Meeting' });
        setTimeout(() => {
          sendJsonMessage(disconnectPayload);
        }, 100);

        Util.log('Safely disconnected from Edu-pal socket connections.');
        (e || document.event).returnValue = null;
        return null;
      });

      // wait for meet to relay call ended message
      while (document.querySelector("[data-call-ended='true']") == null) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 200));
      }
      mixpanelTrack({ event: 'Leave Meeting' });
      setTimeout(() => {
        sendJsonMessage(disconnectPayload);
        setConnect(false);
      }, 100);
      Util.log('Safely disconnected from Edu-pal socket connections');
    })();
  }, []);

  if (!connect) return <></>;

  return (
    <>
      <ShortAppBar ref={appbarRef} />
      <Sidebar ref={sidebarRef} />
    </>
  );
};

export default App;
