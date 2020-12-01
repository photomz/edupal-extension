import React from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import MuiCardHeader from '@material-ui/core/CardHeader';
import MuiCardMedia from '@material-ui/core/CardMedia';
import MuiCardActions from '@material-ui/core/CardActions';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';

import OpenIcon from '@material-ui/icons/OpenInNew';
import RightIcon from '@material-ui/icons/ChevronRight';
import LazyAvatar from '../LazyAvatar';

import McqOption from './McqOption';
import MultiSelectOption from './MultiSelectOption';
import ShortAnswerOption from './ShortAnswerOption';
import TrueFalseOption from './TrueFalseOption';

import Util from '../../util';
import { carouselOrder } from '../../logic/common';
import { questions } from '../../logic/question';
import { iHaveResponded } from '../../logic/response';

const H5 = styled(MuiTypography)`
  ${({ theme: $ }) => `padding-left: ${$.spacing(2)}px`}
`;
const Image = styled(MuiCardMedia)`
  height: 0;
  padding-top: 56.25%; /* 16:9 */
  position: relative;
`;
const CornerButton = styled(MuiIconButton)`
  position: absolute;
  bottom: 5px;
  right: 8px;
  color: #efefefbb;
  background-color: rgba(0, 0, 0, 0.35);
  &:hover {
    box-shadow: ${({ theme: $ }) => $.shadows[8]};
    background-color: rgba(0, 0, 0, 0.65);
  }
`;

const typeMap = {
  MCQ: McqOption,
  ShortAnswer: ShortAnswerOption,
  MultiSelect: MultiSelectOption,
  TrueFalse: TrueFalseOption,
};

const QuestionCardContent = ({ qid }) => {
  const { question } = useRecoilValue(questions(qid));
  const Option = typeMap[question.type];
  return (
    <>
      <H5 component="h4" variant="h5" color="initial" gutterBottom>
        {question.text}
      </H5>
      {question.image !== null && (
        <Image image={question.image} title="Question image">
          <CornerButton
            title="Open image in new tab"
            onClick={() => window.open(question.image)}
          >
            <OpenIcon />
          </CornerButton>
        </Image>
      )}
      <MuiCardActions>
        <Option qid={qid} />
      </MuiCardActions>
    </>
  );
};

QuestionCardContent.propTypes = {
  qid: prop.string.isRequired,
};

const QuestionCard = ({ qid }) => {
  const { avatar, teacher, askTimestamp } = useRecoilValue(questions(qid));
  const switchCard = useSetRecoilState(carouselOrder(qid));
  const hasResponded = useRecoilValue(iHaveResponded(qid));

  return (
    <>
      <MuiCardHeader
        avatar={<LazyAvatar src={avatar} />}
        action={
          <MuiIconButton
            aria-label="See other card"
            disabled={!hasResponded}
            onClick={() => hasResponded && switchCard(1)}
          >
            <RightIcon />
          </MuiIconButton>
        }
        title={teacher.name}
        subheader={Util.parseDateToDayTime(askTimestamp)}
      />
      <QuestionCardContent qid={qid} />
    </>
  );
};

QuestionCard.propTypes = {
  qid: prop.string.isRequired,
};

export default QuestionCard;
export { QuestionCardContent };
