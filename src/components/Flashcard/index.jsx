import React, { useEffect } from 'react';
import prop from 'prop-types';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import atoms from '../../atoms';

import Util from '../../util';
import QuestionCard from './QuestionCard';
import AnswerCard from './AnswerCard';

const Wrapper = styled.div`
  ${({ theme: $ }) => `  
  background-color: transparent;
  height: auto;
  perspective: 999px;
  position: relative;
  text-align: center;
  overflow: hidden;
  position: relative;
  & > * {
    margin: ${$.spacing(2)};
  }
  `}
`;

const Flashcard = ({ num }) => {
  const { questionId } = useRecoilValue(atoms.questions)[num];
  const hasResponded = useRecoilValue(atoms.flipResponse)[questionId];
  const isFlipped = useRecoilValue(atoms.flipFlashcard)[questionId];
  const response = useRecoilValue(atoms.response)[questionId];
  const meetData = useRecoilValue(atoms.meetData);
  const question = useRecoilValue(atoms.questions)[num];
  const respondTimestamp = useRecoilValue(atoms.respondTimestamp)[questionId];

  const renderQuestion = Util.useDelayUnmount(!isFlipped, 250);
  const renderAnswer = Util.useDelayUnmount(isFlipped, 250);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const payload = {
      route: 'respond',
      data: {
        student: {
          name: meetData.name,
          id: meetData.userId,
        },
        answerCrypt: question.answerCrypt,
        avatar: meetData.avatar,
        questionId: question.questionId,
        meetingId: meetData.meetingId,
        classId: 'null', // TODO: Class join show get UI UX in V2
        response: JSON.stringify(response),
        askTimestamp: question.askTimestamp,
        respondTimestamp,
      },
    };
    // TODO: Websocket emit
  }, [hasResponded]);

  return (
    <Wrapper>
      {renderAnswer && hasResponded && (
        <AnswerCard
          num={num}
          questionId={questionId}
          animationStyle={isFlipped ? 'inright' : 'outright'}
        />
      )}
      {renderQuestion && (
        <QuestionCard
          num={num}
          animationStyle={!isFlipped ? 'inleft' : 'outleft'}
        />
      )}
    </Wrapper>
  );
};

Flashcard.propTypes = {
  num: prop.number.isRequired,
};

export default Flashcard;
