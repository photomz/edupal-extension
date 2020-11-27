import React, { useEffect } from 'react';
import prop from 'prop-types';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import a from '../../atoms';

import Util from '../../util';
import QuestionCard from '../../components/QuestionCard';
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

const Carousel = ({ qid }) => {
  const hasResponded = useRecoilValue(a.hasResponded(qid));
  const role = useRecoilValue(a.role);
  const isFlipped = useRecoilValue(a.carouselOrder(qid));
  const { respondTimestamp, ...response } = useRecoilValue(
    a.responseSelector(qid)
  );
  const meetData = useRecoilValue(a.meetData);
  const question = useRecoilValue(a.questionSelector(qid));

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
      {role === 'STUDENT' && renderAnswer && hasResponded && (
        <AnswerCard
          qid={qid}
          animationStyle={isFlipped ? 'inright' : 'outright'}
        />
      )}
      {role === 'STUDENT' && renderQuestion && (
        <QuestionCard
          qid={qid}
          animationStyle={!isFlipped ? 'inleft' : 'outleft'}
        />
      )}
    </Wrapper>
  );
};

Carousel.propTypes = {
  qid: prop.string.isRequired,
};

export default Carousel;
