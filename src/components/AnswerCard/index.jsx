import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import prop from 'prop-types';

import MuiCardActions from '@material-ui/core/CardActions';
import MuiCardHeader from '@material-ui/core/CardHeader';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';
import MuiGrid from '@material-ui/core/Grid';

import LeftIcon from '@material-ui/icons/ChevronLeft';

import CardSkeleton from '../CardSkeleton';
import RaisedIcon from '../RaisedIcon';

import g from '../../global';
import { carouselOrder } from '../../logic/common';
import { questions } from '../../logic/question';
import { studentAnswer, loadingAnswer } from '../../logic/response';

const PersonCardHeader = styled(MuiCardHeader)`
  border: none;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  border-radius: 4px;
  &&& .MuiCardHeader-action {
    align-self: center;
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
  ${({ $highlighted, theme, $colour }) =>
    $highlighted &&
    `background-color: ${theme.palette[$colour].dark}; 
    box-shadow: ${theme.shadows[4]};
    &&& * {
      color: ${theme.palette.common.white};
      font-weight: ${theme.typography.fontWeightMedium};
    }
     `}
`;

const Body = styled(MuiTypography)`
  margin-bottom: ${({ theme: $ }) => $.spacing(1)};
`;

const AnswerCard = ({ qid }) => {
  const { question, num } = useRecoilValue(questions(qid));
  const { isCorrect, answerText, answer } = useRecoilValue(studentAnswer(qid));
  const switchCard = useSetRecoilState(carouselOrder(qid));
  // eslint-disable-next-line no-unused-vars
  const isLoading = useRecoilValue(loadingAnswer(qid));

  if (isLoading) return <CardSkeleton />;

  const { Icon, colour } = g.correctness[isCorrect];
  console.log(answerText, answer);

  return (
    <>
      <PersonCardHeader
        $highlighted
        $colour={colour}
        title={question.text || `Question ${num + 1}`}
        avatar={<RaisedIcon Icon={Icon} colour={colour} />}
        action={
          <MuiIconButton
            aria-label="See other card"
            onClick={() => switchCard(0)}
          >
            <LeftIcon />
          </MuiIconButton>
        }
      />
      <MuiCardActions>
        <MuiGrid container direction="column" alignItems="flex-start">
          {answerText.map((el, i) => (
            <Body key={`report-row-${i}`}>{el}</Body>
          ))}
        </MuiGrid>
      </MuiCardActions>
    </>
  );
};

AnswerCard.propTypes = {
  qid: prop.string.isRequired,
};

export default AnswerCard;
