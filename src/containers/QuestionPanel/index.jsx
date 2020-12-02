import React from 'react';
import { useRecoilValue } from 'recoil';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import MuiTypography from '@material-ui/core/Typography';

import Carousel from './Carousel';
import { questionIds } from '../../logic/question';

const Wrapper = styled.div``;

const H3 = styled(MuiTypography)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestionPanel = () => {
  const qids = useRecoilValue(questionIds);

  if (!qids.length) return <H3 variant="h5">No questions yet!</H3>;

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
