import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { useRecoilValue } from 'recoil';

import MuiCardContent from '@material-ui/core/CardContent';
import MuiTypography from '@material-ui/core/Typography';

import Person from '../../components/Person';
import Util from '../../util';
import g from '../../global';
import { reportQuestion, responses } from '../../logic/stats';

const Wrapper = styled(Container)`
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
`;

const Body = styled(MuiTypography)`
  margin-bottom: ${({ theme: $ }) => $.spacing(1)};
`;

const ReportPanel = () => {
  const qid = useRecoilValue(reportQuestion);
  const studentResponses = useRecoilValue(responses(qid));

  return (
    <Wrapper>
      {studentResponses.map(
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
            Icon={g.correctness[isCorrect].Icon}
            iconColor={g.correctness[isCorrect].colour}
          >
            <MuiCardContent>
              {responseText.map((el, i) => (
                <Body key={`report-row-${i}`}>{el}</Body>
              ))}
            </MuiCardContent>
          </Person>
        )
      )}
    </Wrapper>
  );
};

export default ReportPanel;
