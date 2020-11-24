/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
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

import InfoIcon from '@material-ui/icons/Info';

import atoms from '../../atoms';
import Util from '../../util';

const FixedWidthCard = styled(Card)`
  max-width: 345px;
`;

const PaddedTypography = styled(Typography)`
  ${({ $ }) => `padding-left: ${$.spacing(2)}`}
`;

const StyledPopover = styled(Popover)`
  pointer-events: none;
`;

const AnswerCard = ({ num }) => {
  const {
    avatar,
    teacher,
    askTimestamp,
    question,
    questionId,
  } = useRecoilValue(atoms.questions)[num];
  const $ = useTheme();
  const [popoverAnchor, setPopoverAnchor] = useState(null);

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
        title={teacher.name}
        subheader={Util.parseDateToDayTime(askTimestamp)}
      />
      <PaddedTypography
        component="h4"
        variant="h5"
        color="initial"
        $={$}
        gutterBottom
      >
        {question.text || `Question ${num + 1}`}
      </PaddedTypography>
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
      <CardActions disableSpacing />
    </FixedWidthCard>
  );
};

AnswerCard.propTypes = {
  num: prop.number.isRequired,
};

export default AnswerCard;
