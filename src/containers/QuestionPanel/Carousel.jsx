import React, { useEffect } from 'react';
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
import ReportCard from '../../components/ReportCard';

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
  const hasResponded = useRecoilValue(a.hasResponded(qid));
  const role = useRecoilValue(a.role);
  const carouselOrder = useRecoilValue(a.carouselOrder(qid));
  const { respondTimestamp, ...response } = useRecoilValue(a.response(qid));
  const meetData = useRecoilValue(a.meetData);
  const question = useRecoilValue(a.questions(qid));

  const renderFirst = Util.useDelayUnmount(carouselOrder === 0, 250);
  const renderSecond = Util.useDelayUnmount(carouselOrder === 1, 250);

  useEffect(() => {
    if (!hasResponded) return;
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

  const CardOne =
    role === 'STUDENT' ? QuestionCard : role === 'TEACHER' && SummaryCard;
  const CardTwo =
    role === 'STUDENT' ? AnswerCard : role === 'TEACHER' && ReportCard;

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
