/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import { useRecoilValue } from 'recoil';
import { useTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

import InfoIcon from '@material-ui/icons/Info';
import CorrectIcon from '@material-ui/icons/CheckCircle';
import WrongIcon from '@material-ui/icons/Cancel';
import UngradedIcon from '@material-ui/icons/IndeterminateCheckBox';

import atoms from '../../atoms';
import Util from '../../util';

const FixedWidthCard = styled(Card)`
  max-width: 345px;
  height: 100%;
`;

const PaddedTypography = styled(Typography)`
  ${({ $ }) => `padding-left: ${$.spacing(2)}`}
`;

const StyledPopover = styled(Popover)`
  pointer-events: none;
`;

const StyledGrid = styled(Grid)`
  ${({ $, colour }) => `
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

const largeIconMap = {
  true: [CorrectIcon, 'green'],
  false: [WrongIcon, 'red'],
  null: [UngradedIcon, 'primary'],
};

const AnswerCard = ({ num }) => {
  const { avatar, name, userId } = useRecoilValue(atoms.meetData);
  const $ = useTheme();
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const { questionId, question } = useRecoilValue(atoms.questions)[num];
  const respondTimestamp = useRecoilValue(atoms.respondTimestamp)[questionId];
  const response = useRecoilValue(atoms.response)[questionId];
  const [isLoading, setIsLoading] = useState(true);

  const answer = {
    isCorrect: true,
    pointsEarned: 3,
  };

  // TODO: Set by websocket receive response action
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const [Icon, colour] = largeIconMap[answer.isCorrect];

  return (
    <FixedWidthCard>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        action={
          <IconButton
            aria-label="More information"
            onMouseEnter={(e) => setPopoverAnchor(e.currentTarget)}
            onMouseLeave={() => setPopoverAnchor(null)}
          >
            <InfoIcon />
          </IconButton>
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
            ? `{questionId: ${questionId},
            respondTimestamp: ${respondTimestamp},
            student.id: ${userId},
            response: ${JSON.stringify(response).slice(0, 100)} }`
            : 'Nothing to see here...'}
        </Typography>
      </StyledPopover>
      <CardActions disableSpacing>
        <Grid
          container
          item
          direction="row"
          alignItems="center"
          justify="center"
          styles={{ flexGrow: 1 }}
        >
          <StyledGrid $={$} colour={colour}>
            {isLoading ? (
              <Skeleton
                animation="wave"
                variant="circle"
                width={50}
                height={50}
              />
            ) : (
              <Icon />
            )}
          </StyledGrid>
          {isLoading ? (
            <Skeleton animation="wave" variant="rect" width={80} height={20} />
          ) : (
            <Typography variant="h5" component="h3">
              {`+${answer.pointsEarned} Points!`}
            </Typography>
          )}
        </Grid>
      </CardActions>
    </FixedWidthCard>
  );
};

AnswerCard.propTypes = {
  num: prop.number.isRequired,
};

export default AnswerCard;
