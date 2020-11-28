import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import prop from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import a from '../../atoms';
import BarChartRow from './BarChartRow';

const TextBlock = styled(Typography)`
  margin: ${({ theme: $ }) => $.spacing(2)};
  padding: ${({ theme: $ }) => `0 ${$.spacing(1)} 0 ${$.spacing(2)}`};
  flex-grow: 10;
  border-width: 1px;
  text-align: left;
  border-left: 2px solid ${({ theme: $ }) => $.palette.secondary.main};
`;

const BarChart = ({ qid }) => {
  const {
    meta,
    question: { type },
  } = useRecoilValue(a.questions(qid));

  // True false question type has no meta, create fallback
  const { options, optionNum } = meta || {
    options: [true, false],
    optionNum: 2,
  };

  const hasOptionsText = options !== null;
  return (
    <Grid container spacing={1} justify="center" direction="column">
      {[...Array(optionNum)].map((_, i) => (
        <div key={i}>
          <BarChartRow i={i} qid={qid} isTf={type === 'TrueFalse'} />
          {hasOptionsText && (
            <TextBlock variant="body2">{options[i]}</TextBlock>
          )}
        </div>
      ))}
    </Grid>
  );
};

BarChart.propTypes = {
  qid: prop.string.isRequired,
};

export default BarChart;
