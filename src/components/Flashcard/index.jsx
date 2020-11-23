import React, { useState } from 'react';
import prop from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';

import QuestionCard from './QuestionCard';
import AnswerCard from './AnswerCard';

const Wrapper = styled.div`
  ${({ theme }) => `  
  background-color: transparent;
  width: 350px;
  height: 600px;
  perspective: 999px;
  margin-bottom: ${theme.spacing(4)};`}
`;

const InnerWrapper = styled.div`
  ${({ theme }) => ` 
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: ${theme.transitions.create('transform', {
    duration: theme.transitions.duration.complex,
    easing: theme.transitions.easing.easeInOut,
  })};
  transform-style: preserve-3d;
  transform:`} ${({ isFlipped }) => (isFlipped ? 'rotateX(180deg)' : 'none')};
`;

const CardSide = styled.div`
  ${({ theme }) => `  
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 25px;
  background-color: ${theme.palette.common.white};
  box-shadow: ${theme.shadows[5]};`}
`;

const FrontSide = styled(CardSide)``;

const BackSide = styled(CardSide)`
  transform: rotateX(180deg);
`;

const Flashcard = ({ num }) => {
  // TODO: Put these state into recoil with dict atoms
  // eslint-disable-next-line no-unused-vars
  const [hasResponded, setHasResponded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const theme = useTheme();

  const handleFlip = () => {
    if (hasResponded) setIsFlipped((prev) => !prev);
  };

  return (
    <Wrapper theme={theme} onClick={handleFlip}>
      <InnerWrapper theme={theme} isFlipped={isFlipped}>
        <FrontSide theme={theme}>
          <QuestionCard num={num} />
        </FrontSide>
        <BackSide theme={theme}>
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
