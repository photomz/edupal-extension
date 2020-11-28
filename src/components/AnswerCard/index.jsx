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

const AnswerCard = ({ qid }) => {
  const { avatar, userId } = useRecoilValue(a.meetData);
  const { question, num } = useRecoilValue(a.questions(qid));
  const { respondTimestamp, ...response } = useRecoilValue(a.myResponse(qid));
  const switchCard = useSetRecoilState(a.carouselOrder(qid));
  const isLoading = useRecoilValue(a.loadingAnswer(qid));

  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const answer = {
    isCorrect: true,
    pointsEarned: 3,
  };

  const { Icon, colour } = g.correctness[answer.isCorrect];

  return (
    <>
      <CardHeader
        avatar={<LazyAvatar src={avatar} />}
        action={
          <>
            <IconButton
              aria-label="More information"
              onMouseEnter={(e) => setPopoverAnchor(e.currentTarget)}
              onMouseLeave={() => setPopoverAnchor(null)}
            >
              <InfoIcon />
            </IconButton>
            <IconButton
              aria-label="See other card"
              onClick={() => switchCard(0)}
            >
              <LeftIcon />
            </IconButton>
          </>
        }
        title={question.text || `Question ${num + 1}`}
        subheader={Util.parseDateToDayTime(respondTimestamp)}
      />
      <StyledPopover
        anchorEl={popoverAnchor}
        open={!!popoverAnchor}
        onClose={() => setPopoverAnchor(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        disableRestoreFocus
      >
        <Typography>
          {process.env.NODE_ENV === 'development'
            ? `{qid: ${qid},
            respondTimestamp: ${respondTimestamp},
            student.id: ${userId},
            response: ${JSON.stringify(response).slice(0, 100)} }`
            : 'Nothing to see here...'}
        </Typography>
      </StyledPopover>
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
            <Typography variant="h5" component="h3">
              {`+${answer.pointsEarned} Points!`}
            </Typography>
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
