import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { useRecoilValue } from 'recoil';

import CardContent from '@material-ui/core/CardContent';
import WrongIcon from '@material-ui/icons/Cancel';
import CorrectIcon from '@material-ui/icons/CheckCircle';
import UngradedIcon from '@material-ui/icons/RemoveCircle';
import Typography from '@material-ui/core/Typography';

import Person from '../../components/Person';
import a from '../../atoms';
import Util from '../../util';

const FlexContainer = styled(Container)`
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
`;

const Body = styled(Typography)`
  margin-bottom: ${({ theme: $ }) => $.spacing(1)};
`;

const ReportPanel = () => {
  const qid = useRecoilValue(a.reportQuestion);
  const responses = useRecoilValue(a.responses(qid));

  return (
    <FlexContainer>
      {responses.map(
        ({
          student,
          coinsEarned,
          respondTimestamp,
          isCorrect,
          responseText,
        }) => (
          <Person
            key={student.id}
            name={student.name}
            avatar={student.avatar}
            change={coinsEarned}
            subheader={Util.parseDateToDayTime(respondTimestamp)}
            Icon={
              isCorrect === null
                ? UngradedIcon
                : isCorrect
                ? CorrectIcon
                : WrongIcon
            }
            iconColor={
              isCorrect === null ? 'silver' : isCorrect ? 'green' : 'red'
            }
          >
            <CardContent>
              {responseText.map((el, i) => (
                <Body key={`report-row-${i}`}>{el}</Body>
              ))}
            </CardContent>
          </Person>
        )
      )}
    </FlexContainer>
  );
};

export default ReportPanel;
