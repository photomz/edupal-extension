import React from 'react';
import prop from 'prop-types';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import a from '../../atoms';

import Util from '../../util';
import slide from '../../styles/animate';
import QuestionCard from '../../components/QuestionCard';
import SummaryCard from '../../components/SummaryCard';
import AnswerCard from '../../components/AnswerCard';

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

const StyledCard = styled(Card)`
  animation: ${({ $animationStyle }) => slide[$animationStyle]};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
`;

const Carousel = ({ qid }) => {
  const hasResponded = useRecoilValue(a.iHaveResponded(qid));
  const role = useRecoilValue(a.role);
  const carouselOrder = useRecoilValue(a.carouselOrder(qid));

  const renderFirst = Util.useDelayUnmount(carouselOrder === 0, 250);
  const renderSecond = Util.useDelayUnmount(carouselOrder === 1, 250);

  const CardOne =
    role === 'STUDENT' ? QuestionCard : role === 'TEACHER' && SummaryCard;
  const CardTwo = role === 'STUDENT' ? AnswerCard : null;

  return (
    <Wrapper>
      {renderFirst && (
        <StyledCard
          $animationStyle={carouselOrder === 0 ? 'inright' : 'outright'}
        >
          <CardOne qid={qid} />
        </StyledCard>
      )}
      {renderSecond && hasResponded && (
        <StyledCard
          $animationStyle={carouselOrder === 1 ? 'inleft' : 'outleft'}
        >
          <CardTwo qid={qid} />
        </StyledCard>
      )}
    </Wrapper>
  );
};

Carousel.propTypes = {
  qid: prop.string.isRequired,
};

export default Carousel;
