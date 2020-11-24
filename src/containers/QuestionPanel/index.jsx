import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import atoms from '../../atoms';
import Flashcard from '../../components/Flashcard';

import mockWebsocketData from './data.json';

const FlexContainer = styled(Container)`
  overflow: hidden;
`;

const QuestionPanel = () => {
  const addQuestion = useSetRecoilState(atoms.addQuestion);
  const numQuestions = useRecoilValue(atoms.numQuestions);

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
    <FlexContainer>
      {[...Array(numQuestions)].map((_, i) => (
        <Flashcard key={i} num={i} />
      ))}
    </FlexContainer>
  );
};

export default QuestionPanel;
