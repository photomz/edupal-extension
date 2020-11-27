import React, { useEffect, useRef } from 'react';
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import a from '../../atoms';

import Carousel from './Carousel';
import QuestionBuilder from '../../components/QuestionBuilder';

import mockWebsocketData from './data.json';

const FlexContainer = styled.div`
  overflow: hidden;
`;

const QuestionPanel = () => {
  const questionIds = useRecoilValue(a.questionIds);
  const isDrawerOpen = useRecoilValue(a.isDrawerOpen);

  const addQuestion = useSetRecoilState(a.questionSelector());
  const resetCarousel = useResetRecoilState(a.carouselOrderAtom);
  const role = useRecoilValue(a.role);

  const panelBottom = useRef(null);
  const panelHeight = useRef(null);

  useEffect(() => {
    panelBottom.current.scrollIntoView({ behavior: 'smooth' });
  }, [isDrawerOpen, panelHeight]);

  useEffect(() => {
    if (!isDrawerOpen) resetCarousel();
  }, [isDrawerOpen]);

  // TODO: Websocket
  useEffect(() => {
    mockWebsocketData.forEach(({ action, data }) => {
      switch (action) {
        case 'receiveAsk':
          // TODO: Fill a.questionResponseStates with questionIds on init
          addQuestion(data);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <FlexContainer ref={panelHeight}>
      {questionIds.map((qid) => (
        <Carousel key={qid} qid={qid} />
      ))}
      {role === 'TEACHER' && <QuestionBuilder />}
      <div ref={panelBottom} />
    </FlexContainer>
  );
};

export default QuestionPanel;
