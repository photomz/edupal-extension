import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import a from '../../atoms';

import Carousel from './Carousel';

import mockWebsocketData from './data.json';

const Wrapper = styled.div`
  overflow: hidden;
`;

const QuestionPanel = () => {
  // Most recent questions at top
  const questionIds = useRecoilValue(a.questionIds);
  const addQuestion = useSetRecoilState(a.addQuestion);
  const addResponse = useSetRecoilState(a.addResponse);

  // TODO: Websocket
  useEffect(() => {
    mockWebsocketData.forEach(({ action, data }) => {
      switch (action) {
        case 'receiveAsk':
          // TODO: Fill a.questionResponseStates with questionIds on init
          addQuestion(data);
          break;
        case 'receiveResponse':
          addResponse(data);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <Wrapper>
      {questionIds.map((qid) => (
        <Carousel key={qid} qid={qid} />
      ))}
    </Wrapper>
  );
};

export default QuestionPanel;
