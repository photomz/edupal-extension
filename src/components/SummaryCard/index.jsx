import React, { useState } from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

import InfoIcon from '@material-ui/icons/Info';
import RightIcon from '@material-ui/icons/ChevronRight';
import LazyAvatar from '../LazyAvatar';

import BarChart from './BarChart';
import Util from '../../util';
import { questions } from '../../logic/question';
import { goToReport, responseSpeed } from '../../logic/stats';

const StyledPopover = styled(Popover)`
  pointer-events: none;
`;

const GreyLabel = styled(Typography)`
  color: ${({ theme: $ }) => $.palette.grey[600]};
  margin-bottom: ${({ theme: $ }) => $.spacing(1)};
`;

const ActionsWrapper = styled.div`
  flex-grow: 1;
  margin: 0 ${({ theme: $ }) => $.spacing(1)};
`;

const SummaryCard = ({ qid }) => {
  const { avatar, teacher, askTimestamp, question } = useRecoilValue(
    questions(qid)
  );
  const switchToReport = useSetRecoilState(goToReport(qid));
  const avgTime = useRecoilValue(responseSpeed(qid));

  const [popoverAnchor, setPopoverAnchor] = useState(null);

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
            <IconButton aria-label="See other card" onClick={switchToReport}>
              <RightIcon />
            </IconButton>
          </>
        }
        title={question.text}
        subheader={Util.parseDateToDayTime(askTimestamp)}
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
            ? `{questionId: ${qid}, askTimestamp: ${askTimestamp}, teacher.id: ${teacher.id} }`
            : 'Nothing to see here...'}
        </Typography>
      </StyledPopover>
      <CardActions>
        <ActionsWrapper>
          <GreyLabel>
            {`Average time taken: ${Util.formatTimeDiff(avgTime)}`}
          </GreyLabel>
          {question.type !== 'ShortAnswer' && <BarChart qid={qid} />}
        </ActionsWrapper>
      </CardActions>
    </>
  );
};

SummaryCard.propTypes = {
  qid: prop.string.isRequired,
};

export default SummaryCard;
