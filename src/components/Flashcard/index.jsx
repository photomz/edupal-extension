import React from 'react';
import prop from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
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

const slideAnimation = css`
  ${slideInRight} 0.6s ease-out;
`;
const Wrapper = styled.div`
  ${({ $ }) => `  
  background-color: transparent;
  width: 350px;
  height: auto;
  perspective: 999px;
  margin: ${$.spacing(4)} 0;
  `}
  animation: ${({ isAnimating }) => (isAnimating ? slideAnimation : 'none')};
`;

const InnerWrapper = styled.div`
  ${({ $ }) => ` 
  position: relative;
  text-align: center;
  transition: ${$.transitions.create('transform', {
    duration: $.transitions.duration.complex,
    easing: $.transitions.easing.easeInOut,
  })};
  transform-style: preserve-3d;
  transform:`} ${({ isFlipped }) => (isFlipped ? 'rotateX(180deg)' : 'none')};
`;

const CardSide = styled.div`
  /* position: absolute; */
  backface-visibility: hidden;
`;

const FrontSide = styled(CardSide)``;

const BackSide = styled(CardSide)`
  transform: rotateX(180deg);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Flashcard = ({ num }) => {
  const { questionId } = useRecoilValue(atoms.questions)[num];
  const [hasRespondedMap, setHasResponded] = useRecoilState(atoms.flipResponse);
  const hasResponded = hasRespondedMap[questionId];
  const [isFlippedMap, setIsFlipped] = useRecoilState(atoms.flipFlashcard);
  const isDrawerOpen = useRecoilValue(atoms.isDrawerOpen);
  const isFlipped = isFlippedMap[questionId];
  const $ = useTheme();

  const handleFlip = () => {
    if (hasResponded) setIsFlipped(questionId);
  };

  const handleRespond = () => setHasResponded(questionId);

  return (
    <Wrapper $={$} onClick={handleFlip} isAnimating={isDrawerOpen}>
      <InnerWrapper $={$} isFlipped={isFlipped}>
        <FrontSide>
          <QuestionCard num={num} handleRespond={handleRespond} />
        </FrontSide>
        <BackSide>
          <AnswerCard num={num} />
        </BackSide>
      </InnerWrapper>
    </Wrapper>
  );
};

Flashcard.propTypes = {
  num: prop.number.isRequired,
};

export default Flashcard;
