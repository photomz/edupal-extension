import React, { useState } from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import { useSnackbar, SnackbarContent } from 'notistack';

import MuiCollapse from '@material-ui/core/Collapse';
import MuiTypography from '@material-ui/core/Typography';
import MuiCard from '@material-ui/core/Card';
import MuiCardActions from '@material-ui/core/CardActions';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiCloseIcon from '@material-ui/icons/Close';
import ChevronIcon from '@material-ui/icons/ExpandMore';

import { useSetRecoilState } from 'recoil';
import { QuestionCardContent } from '../../components/QuestionCard';
import { receiveAskAction } from '../../logic/snackbar';

const IconButton = styled(MuiIconButton)`
  padding: ${({ theme: $ }) => $.spacing(1)};
`;
const Chevron = styled(IconButton)`
  transform: rotate(${({ open }) => (open ? 0 : 180)}deg);
  transition: transform 0.5s ease-in-out;
`;
const Wrapper = styled(SnackbarContent)`
  ${({ theme: $ }) => $.breakpoints.up('sm')} {
    min-width: 344px;
  }
`;
const Card = styled(MuiCard)`
  width: 100%;
`;
const CardActions = styled(MuiCardActions)`
  padding: ${({ theme: $ }) => $.spacing(1)};
  padding-left: ${({ theme: $ }) => $.spacing(2)};
`;
const ButtonsWrapper = styled.div`
  margin-left: auto;
`;

const SnackMessage = React.forwardRef(({ id, message, qid }, ref) => {
  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);
  const followThrough = useSetRecoilState(receiveAskAction);

  return (
    <Wrapper ref={ref}>
      <Card>
        <CardActions>
          <MuiTypography variant="subtitle2">
            <b>{message}</b>
          </MuiTypography>
          <ButtonsWrapper>
            <Chevron
              aria-label="Show more"
              open={expanded}
              onClick={() => setExpanded((prev) => !prev)}
            >
              <ChevronIcon />
            </Chevron>
            <IconButton onClick={() => closeSnackbar(id)}>
              <MuiCloseIcon />
            </IconButton>
          </ButtonsWrapper>
        </CardActions>
        <MuiCollapse in={expanded} timeout="auto" unmountOnExit>
          <QuestionCardContent qid={qid} onClick={followThrough} />
        </MuiCollapse>
      </Card>
    </Wrapper>
  );
});

SnackMessage.defaultProps = {
  message: '',
};

SnackMessage.propTypes = {
  id: prop.string.isRequired,
  message: prop.string,
  qid: prop.string.isRequired,
};

export default SnackMessage;
