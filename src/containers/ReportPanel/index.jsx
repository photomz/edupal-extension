import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import MuiIconButton from '@material-ui/core/IconButton';
import MuiGrid from '@material-ui/core/Grid';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiTypography from '@material-ui/core/Typography';

import LeftIcon from '@material-ui/icons/ChevronLeft';

import CardSkeleton from '../../components/CardSkeleton';
import Person from '../../components/Person';
import Util from '../../util';
import g from '../../global';
import { tabOrder } from '../../logic/common';
import { reportQuestion, responses } from '../../logic/stats';
import { questions } from '../../logic/question';

const Wrapper = styled(Container)`
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(1)}px
    ${({ theme }) => theme.spacing(2)}px;
`;

const Body = styled(MuiTypography)`
  margin-bottom: ${({ theme: $ }) => $.spacing(1)}px;
`;
const Head = styled(MuiGrid)`
  padding: ${({ theme: $ }) => $.spacing(2)}px;
`;

const H5 = styled(MuiTypography)`
  line-height: 1;
  overflow-x: auto;
  overflow-wrap: break-word;
  overflow-y: hidden;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  margin-right: ${({ theme: $ }) => $.spacing(1)};
`;

const ChevronLeft = styled(MuiIconButton)`
  margin: ${({ theme: $ }) => $.spacing(1)}px;
  margin-left: ${({ theme: $ }) => $.spacing(-1)}px;
`;

const ReportPanel = () => {
  const qid = useRecoilValue(reportQuestion);
  const { question } = useRecoilValue(questions(qid));
  const setTabOrder = useSetRecoilState(tabOrder);
  const studentResponses = useRecoilValue(responses(qid));

  // https://github.com/facebookexperimental/Recoil/issues/774
  if (question === undefined || !studentResponses.length)
    return <CardSkeleton />;

  return (
    <Wrapper>
      <Head
        container
        direction="reverse-row"
        justify="space-between"
        alignItems="center"
      >
        <ChevronLeft aria-label="See other card" onClick={() => setTabOrder(1)}>
          <LeftIcon />
        </ChevronLeft>
        <H5 variant="h5">{question.text}</H5>
      </Head>

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
