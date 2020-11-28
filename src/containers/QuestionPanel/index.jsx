import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

import a from '../../atoms';
import Carousel from './Carousel';

import mockWebsocketData from './data.json';

const Wrapper = styled.div``;

const QuestionPanel = () => {
  // Most recent questions at top
  const qids = useRecoilValue(a.questionIds);
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
    <Wrapper id="edupal-questionPanel">
      {qids.map((qid) => (
        <LazyLoad
          key={qid}
          once
          scrollContainer="edupal-questionPanel"
          height="100%"
          overflow
          throttle
        >
          <Carousel qid={qid} />
        </LazyLoad>
      ))}
    </Wrapper>
  );
};

export default QuestionPanel;
