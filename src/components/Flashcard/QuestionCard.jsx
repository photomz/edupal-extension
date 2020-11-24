/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import { useRecoilValue } from 'recoil';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

import InfoIcon from '@material-ui/icons/Info';
import OpenIcon from '@material-ui/icons/OpenInNew';

import {
  McqOption,
  MultiSelectOption,
  ShortAnswerOption,
  TrueFalseOption,
} from './Options';
import atoms from '../../atoms';
import Util from '../../util';

const useStyles = makeStyles(($) => ({
  root: {
    maxWidth: 345,
  },
  title: {
    paddingLeft: $.spacing(2),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: $.transitions.create('transform', {
      duration: $.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const StyledPopover = styled(Popover)`
  pointer-events: none;
`;

const PositionedCardMedia = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%; /* 16:9 */
  position: relative;
`;

const CornerIconButton = styled(IconButton)`
  ${({ $ }) => `  
  position: absolute;
  bottom: 5px;
  right: 8px;
  color: #efefefbb;
  background-color: rgba(0,0,0,0.35);
  &:hover {
    box-shadow: ${$.shadows[8]};
    background-color: rgba(0,0,0,0.65);
  }
  `}
`;

const QuestionCard = ({ num }) => {
  const {
    avatar,
    teacher,
    askTimestamp,
    question,
    questionId,
  } = useRecoilValue(atoms.questions)[num];
  const c = useStyles();
  const $ = useTheme();
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  let OptionComponent;
  switch (question.type) {
    case 'MCQ':
      OptionComponent = McqOption;
      break;
    case 'ShortAnswer':
      OptionComponent = ShortAnswerOption;
      break;
    case 'MultiSelect':
      OptionComponent = MultiSelectOption;
      break;
    case 'TrueFalse':
      OptionComponent = TrueFalseOption;
      break;
    default:
      throw new Error('Invalid question type');
  }

  return (
    <Card className={c.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={avatar} className={c.avatar} />
        }
        action={
          <IconButton
            aria-label="settings"
            onMouseEnter={(e) => setPopoverAnchor(e.currentTarget)}
            onMouseLeave={() => setPopoverAnchor(null)}
          >
            <InfoIcon />
          </IconButton>
        }
        title={teacher.name}
        subheader={Util.parseDateToDayTime(askTimestamp)}
      />
      <Typography
        component="h4"
        variant="h5"
        color="initial"
        className={c.title}
        gutterBottom
      >
        {question.text || `Question ${num + 1}`}
      </Typography>
      {question.image !== null && (
        <PositionedCardMedia image={question.image} title="Question image">
          <CornerIconButton
            title="Open image in new tab"
            $={$}
            onClick={() => window.open(question.image)}
          >
            <OpenIcon />
          </CornerIconButton>
        </PositionedCardMedia>
      )}
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
            ? `{questionId: ${questionId}, askTimestamp: ${askTimestamp}, teacher.id: ${teacher.id} }`
            : 'Nothing to see here...'}
        </Typography>
      </StyledPopover>
      <CardActions disableSpacing>
        <OptionComponent num={num} />
      </CardActions>
    </Card>
  );
};

QuestionCard.propTypes = {
  num: prop.number.isRequired,
};

export default QuestionCard;
