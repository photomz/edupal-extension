import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import prop from 'prop-types';

import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Skeleton from '@material-ui/lab/Skeleton';

import InfoIcon from '@material-ui/icons/Info';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import LazyAvatar from '../LazyAvatar';

import a from '../../atoms';
import Util from '../../util';
import g from '../../global';

const StyledPopover = styled(Popover)`
  pointer-events: none;
`;

const StyledGrid = styled(Grid)`
  ${({ theme: $, colour }) => `
  color: ${$.palette[colour].main};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 ${$.spacing(2)};
  &&& > svg {
    width: 50px;
    height: 50px;
  }
`}
`;

const Body = styled(Typography)`
  margin-bottom: ${({ theme: $ }) => $.spacing(1)};
  color: ${({ theme: $ }) => $.palette.green.main};
`;

const AnswerCard = ({ qid }) => {
  const { avatar } = useRecoilValue(a.meetData);
  const { question, num } = useRecoilValue(a.questions(qid));
  const { respondTimestamp } = useRecoilValue(a.myResponse(qid));
  const { isCorrect, coinsEarned, answerText } = useRecoilValue(
    a.studentAnswer(qid)
  );
  const switchCard = useSetRecoilState(a.carouselOrder(qid));
  const isLoading = useRecoilValue(a.loadingAnswer(qid));

  const { Icon, colour } = g.correctness[isCorrect];

  return (
    <>
      <CardHeader
        avatar={<LazyAvatar src={avatar} />}
        action={
          <IconButton aria-label="See other card" onClick={() => switchCard(0)}>
            <LeftIcon />
          </IconButton>
        }
        title={question.text || `Question ${num + 1}`}
        subheader={Util.parseDateToDayTime(respondTimestamp)}
      />
      <CardContent>
        <Grid
          container
          item
          direction="row"
          alignItems="center"
          justify="center"
          styles={{ flexGrow: 1 }}
        >
          <StyledGrid colour={colour}>
            {isLoading ? (
              <Skeleton variant="circle" width={50} height={50} />
            ) : (
              <Icon />
            )}
          </StyledGrid>
          {isLoading ? (
            <Skeleton variant="rect" width={80} height={20} />
          ) : (
            <>
              <Typography variant="h5" component="h3">
                {`+${coinsEarned} Points!`}
              </Typography>
              {answerText.map((el, i) => (
                <Body key={`report-row-${i}`}>{el}</Body>
              ))}
            </>
          )}
        </Grid>
      </CardContent>
    </>
  );
};

AnswerCard.propTypes = {
  qid: prop.string.isRequired,
};

export default AnswerCard;
