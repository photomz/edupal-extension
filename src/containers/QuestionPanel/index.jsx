import React from 'react';
import { useRecoilValue } from 'recoil';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

import a from '../../atoms';
import Carousel from './Carousel';

const Wrapper = styled.div``;

const QuestionPanel = () => {
  const qids = useRecoilValue(a.questionIds);

  return (
    <Wrapper id="edupal-questionPanel">
      {qids.map((qid) => (
        <LazyLoad
          key={qid}
          once
          scrollContainer="edupal-questionPanel"
          height="100%"
          overflow
          throttle
        >
          <Carousel qid={qid} />
        </LazyLoad>
      ))}
    </Wrapper>
  );
};

export default QuestionPanel;
