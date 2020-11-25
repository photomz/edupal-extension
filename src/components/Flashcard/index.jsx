import React, { useEffect } from 'react';
import prop from 'prop-types';
import { useRecoilValue } from 'recoil';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import atoms from '../../atoms';

import QuestionCard from './QuestionCard';
import AnswerCard from './AnswerCard';

const slideInRight = keyframes`
  from {
    transform: translate3d(50vw, 0, 0);
    opacity: 0;
    visibility: hidden;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    visibility: visible;
  }
`;

const duration = '0.6s'; // Stylelint throws useless error otherwise
const easing = 'ease-out';
const slideAnimation = css`
  ${slideInRight} ${duration} ${easing};
`;
const Wrapper = styled.div`
  ${({ $ }) => `  
  background-color: transparent;
  width: 350px;
  height: auto;
  perspective: 999px;
  margin: ${$.spacing(4)} 0;
  position: relative;
  text-align: center;
  `}
  animation: ${({ isAnimating }) => (isAnimating ? slideAnimation : 'none')};
`;

const Flashcard = ({ num }) => {
  const { questionId } = useRecoilValue(atoms.questions)[num];
  const hasResponded = useRecoilValue(atoms.flipResponse)[questionId];
  const isFlipped = useRecoilValue(atoms.flipFlashcard)[questionId];
  const isDrawerOpen = useRecoilValue(atoms.isDrawerOpen);
  const response = useRecoilValue(atoms.response)[questionId];
  const meetData = useRecoilValue(atoms.meetData);
  const question = useRecoilValue(atoms.questions)[num];
  const respondTimestamp = useRecoilValue(atoms.respondTimestamp)[questionId];
  const $ = useTheme();

  useEffect(() => {
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
    console.log(payload);
  }, [hasResponded]);

  return (
    <Wrapper $={$} isAnimating={isDrawerOpen}>
      {isFlipped && hasResponded ? (
        <AnswerCard num={num} questionId={questionId} />
      ) : (
        <QuestionCard num={num} />
      )}
    </Wrapper>
  );
};

Flashcard.propTypes = {
  num: prop.number.isRequired,
};

export default Flashcard;
