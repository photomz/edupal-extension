import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import prop from 'prop-types';

import MuiGrid from '@material-ui/core/Grid';
import MuiCardHeader from '@material-ui/core/CardHeader';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';

import LeftIcon from '@material-ui/icons/ChevronLeft';

import ErrorBoundary from '../ErrorBoundary';
import CardSkeleton from '../CardSkeleton';
import LazyAvatar from '../LazyAvatar';
import Util from '../../util';
import g from '../../global';
import { meetData, carouselOrder } from '../../logic/common';
import { questions } from '../../logic/question';
import { myResponse, studentAnswer, loadingAnswer } from '../../logic/response';

const LargeIconWrapper = styled(MuiGrid)`
  color: ${({ theme: $, colour }) => $.palette[colour].main};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 ${({ theme: $ }) => $.spacing(2)};
  &&& > svg {
    width: 50px;
    height: 50px;
  }
`;

const Body = styled(MuiTypography)`
  margin-bottom: ${({ theme: $ }) => $.spacing(1)};
  color: ${({ theme: $ }) => $.palette.green.main};
`;

const AnswerCard = ({ qid }) => {
  const { avatar } = useRecoilValue(meetData);
  const { question, num } = useRecoilValue(questions(qid));
  const { respondTimestamp } = useRecoilValue(myResponse(qid));
  const { isCorrect, coinsEarned, answerText } = useRecoilValue(
    studentAnswer(qid)
  );
  const switchCard = useSetRecoilState(carouselOrder(qid));
  // eslint-disable-next-line no-unused-vars
  const isLoading = useRecoilValue(loadingAnswer(qid));

  if (isLoading) return <CardSkeleton />;

  const { Icon, colour } = g.correctness[isCorrect];

  return (
    <ErrorBoundary fallback={CardSkeleton}>
      <MuiCardHeader
        avatar={<LazyAvatar src={avatar} />}
        action={
          <MuiIconButton
            aria-label="See other card"
            onClick={() => switchCard(0)}
          >
            <LeftIcon />
          </MuiIconButton>
        }
        title={question.text || `Question ${num + 1}`}
        subheader={Util.parseDateToDayTime(respondTimestamp)}
      />
      <MuiCardContent>
        <MuiGrid
          container
          item
          direction="row"
          alignItems="center"
          justify="center"
          styles={{ flexGrow: 1 }}
        >
          <LargeIconWrapper colour={colour}>
            <Icon />
          </LargeIconWrapper>
          <MuiTypography variant="h5" component="h3">
            {`+${coinsEarned} Points!`}
          </MuiTypography>
          {answerText.map((el, i) => (
            <Body key={`report-row-${i}`}>{el}</Body>
          ))}
        </MuiGrid>
      </MuiCardContent>
    </ErrorBoundary>
  );
};

AnswerCard.propTypes = {
  qid: prop.string.isRequired,
};

export default AnswerCard;
