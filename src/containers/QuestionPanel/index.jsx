import React from 'react';
import { useRecoilValue } from 'recoil';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

import Carousel from './Carousel';
import { questionIds } from '../../logic/question';

const Wrapper = styled.div``;

const QuestionPanel = () => {
  const qids = useRecoilValue(questionIds);

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
