import React from 'react';
import prop from 'prop-types';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';

import MuiCard from '@material-ui/core/Card';

import QuestionCard from '../../components/QuestionCard';
import SummaryCard from '../../components/SummaryCard';
import AnswerCard from '../../components/AnswerCard';

import Util from '../../util';
import slide from '../../styles/animate';
import { iHaveResponded } from '../../logic/response';
import { role, carouselOrder } from '../../logic/common';

const Wrapper = styled.div`
  height: auto;
  position: relative;
  text-align: center;
  overflow: hidden;
  & > * {
    margin: ${({ theme: $ }) => $.spacing(2)};
  }
`;

const Card = styled(MuiCard)`
  animation: ${({ $animationStyle }) => slide[$animationStyle]};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
`;

const Carousel = ({ qid }) => {
  const hasResponded = useRecoilValue(iHaveResponded(qid));
  const userRole = useRecoilValue(role);
  const [order, setOrder] = useRecoilState(carouselOrder(qid));

  const renderFirst = Util.useDelayUnmount(order === 0, 250);
  const renderSecond = Util.useDelayUnmount(order === 1, 250);

  if (userRole === 'TEACHER') setOrder(0);

  const CardOne =
    userRole === 'STUDENT'
      ? QuestionCard
      : userRole === 'TEACHER' && SummaryCard;
  const CardTwo = userRole === 'STUDENT' ? AnswerCard : () => <></>;

  return (
    <Wrapper>
      {renderFirst && (
        <Card $animationStyle={order === 0 ? 'inright' : 'outright'}>
          <CardOne qid={qid} />
        </Card>
      )}
      {renderSecond && hasResponded && (
        <Card $animationStyle={order === 1 ? 'inleft' : 'outleft'}>
          <CardTwo qid={qid} />
        </Card>
      )}
    </Wrapper>
  );
};

Carousel.propTypes = {
  qid: prop.string.isRequired,
};

export default Carousel;
