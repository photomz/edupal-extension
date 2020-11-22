import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const FlexContainer = styled(Container)``;

const QuestionPanel = () => {
  return (
    <FlexContainer>
      <Typography>Question Panel</Typography>
    </FlexContainer>
  );
};

export default QuestionPanel;
