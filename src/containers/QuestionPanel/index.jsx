import React, { useEffect, useRef } from 'react';
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import atoms from '../../atoms';
import Flashcard from '../../components/Flashcard';

import mockWebsocketData from './data.json';

const FlexContainer = styled(Container)`
  overflow: hidden;
`;

const QuestionPanel = () => {
  const numQuestions = useRecoilValue(atoms.numQuestions);
  const isDrawerOpen = useRecoilValue(atoms.isDrawerOpen);

  const addQuestion = useSetRecoilState(atoms.addQuestion);
  const resetFlashcardFlip = useResetRecoilState(atoms.flashcardFlipStates);

  const panelBottom = useRef(null);
  const panelHeight = useRef(null);

  useEffect(() => {
    panelBottom.current.scrollIntoView({ behavior: 'smooth' });
  }, [isDrawerOpen, panelHeight]);

  useEffect(() => {
    if (!isDrawerOpen) resetFlashcardFlip();
  }, [isDrawerOpen]);

  // TODO: Websocket
  useEffect(() => {
    mockWebsocketData.forEach(({ action, data }) => {
      switch (action) {
        case 'receiveAsk':
          // TODO: Fill atoms.questionResponseStates with questionIds on init
          addQuestion(data);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <FlexContainer ref={panelHeight}>
      {[...Array(numQuestions)].map((_, i) => (
        <Flashcard key={i} num={i} />
      ))}
      <div ref={panelBottom} />
    </FlexContainer>
  );
};

export default QuestionPanel;
