/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';

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
import RightIcon from '@material-ui/icons/ChevronRight';

import {
  McqOption,
  MultiSelectOption,
  ShortAnswerOption,
  TrueFalseOption,
} from './Options';
import atoms from '../../atoms';
import Util from '../../util';
import slide from '../../styles/animate';

const StyledCard = styled(Card)`
  animation: ${({ $animationStyle }) => slide[$animationStyle]};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
`;

const PaddedTypography = styled(Typography)`
  ${({ theme: $ }) => `padding-left: ${$.spacing(2)}`}
`;

const StyledPopover = styled(Popover)`
  pointer-events: none;
`;

const PositionedCardMedia = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%; /* 16:9 */
  position: relative;
`;

const CornerIconButton = styled(IconButton)`
  ${({ theme: $ }) => `  
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

const QuestionCard = ({ num, animationStyle }) => {
  const {
    avatar,
    teacher,
    askTimestamp,
    question,
    questionId,
  } = useRecoilValue(atoms.questions)[num];
  const setFlashcardFlip = useSetRecoilState(atoms.flipFlashcard);
  const hasResponded = useRecoilValue(atoms.flipResponse)[questionId];
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

  // TODO: useEffect to construct response object, send to websocket

  return (
    <StyledCard $animationStyle={animationStyle}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
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
              disabled={!hasResponded}
              onClick={() => hasResponded && setFlashcardFlip(questionId)}
            >
              <RightIcon />
            </IconButton>
          </>
        }
        title={teacher.name}
        subheader={Util.parseDateToDayTime(askTimestamp)}
      />
      <PaddedTypography
        component="h4"
        variant="h5"
        color="initial"
        gutterBottom
      >
        {question.text || `Question ${num + 1}`}
      </PaddedTypography>
      {question.image !== null && (
        <PositionedCardMedia image={question.image} title="Question image">
          <CornerIconButton
            title="Open image in new tab"
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
      <CardActions>
        <OptionComponent num={num} />
      </CardActions>
    </StyledCard>
  );
};

QuestionCard.propTypes = {
  num: prop.number.isRequired,
  animationStyle: prop.string.isRequired,
};

export default QuestionCard;
