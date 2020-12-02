import React from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import MuiCardHeader from '@material-ui/core/CardHeader';
import MuiCardActions from '@material-ui/core/CardActions';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';
import MuiTooltip from '@material-ui/core/Toolbar';

import RightIcon from '@material-ui/icons/ChevronRight';

import RaisedIcon from '../RaisedIcon';
import BarChart from './BarChart';
import Util from '../../util';
import g from '../../global';
import { questions } from '../../logic/question';
import { goToReport, responseSpeed } from '../../logic/stats';

const GreyLabel = styled(MuiTypography)`
  color: ${({ theme: $ }) => $.palette.grey[600]};
  margin-bottom: ${({ theme: $ }) => $.spacing(1)}px;
`;

const ActionsWrapper = styled.div`
  flex-grow: 1;
  margin: 0px ${({ theme: $ }) => $.spacing(1)}px;
`;

const PersonCardHeader = styled(MuiCardHeader)`
  border: none;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  border-radius: 4px;
  &&& .MuiCardHeader-action {
    align-self: center;
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  box-shadow: ${({ theme: $ }) => $.shadows[4]};
  & * {
    color: ${({ theme }) => theme.palette.common.white};
    font-weight: ${({ theme: $ }) => $.typography.fontWeightMedium};
    overflow-x: auto;
    overflow-wrap: break-word;
    white-space: break-spaces;
  }
`;
const Tooltip = styled(MuiTooltip)`
  padding: 0px;
  min-height: 40px;
`;

const SummaryCard = ({ qid }) => {
  const { question } = useRecoilValue(questions(qid));
  const switchToReport = useSetRecoilState(goToReport(qid));
  const avgTime = useRecoilValue(responseSpeed(qid));
  const { Icon, name } = g.questionTypes[question.type];

  return (
    <>
      <PersonCardHeader
        avatar={
          <Tooltip title={name}>
            <RaisedIcon colour="info" Icon={Icon} />
          </Tooltip>
        }
        action={
          <MuiIconButton aria-label="See other card" onClick={switchToReport}>
            <RightIcon />
          </MuiIconButton>
        }
        title={<MuiTypography variant="body2">{question.text}</MuiTypography>}
      />
      <MuiCardActions>
        <ActionsWrapper>
          <GreyLabel>
            {`Average time taken: ${Util.formatTimeDiff(avgTime)}`}
          </GreyLabel>
          {question.type !== 'ShortAnswer' && <BarChart qid={qid} />}
        </ActionsWrapper>
      </MuiCardActions>
    </>
  );
};

SummaryCard.propTypes = {
  qid: prop.string.isRequired,
};

export default SummaryCard;
