import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import prop from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import LazyAvatar from '../LazyAvatar';
import { optionBar } from '../../logic/stats';
import g from '../../global';

const StyledAvatar = styled(LazyAvatar)`
  ${({ theme: $, colour }) => `
  background-color: ${$.palette[colour].main};
  color: ${$.palette.common.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
`}
`;

const OuterBar = styled.div`
  flex-grow: 10;
  width: calc(100% - ${({ theme: $ }) => 35 + $.spacing(1) * 2}px);
  height: 20px;
  background-color: ${({ colour, theme: $ }) => $.palette[colour].light}33;
  border-radius: 999px;
  margin: 0px ${({ theme: $ }) => $.spacing(2)}px;
`;

const InnerBar = styled.div`
  width: ${({ percent }) => percent}%;
  background-color: ${({ colour, theme }) => theme.palette[colour].main};
  border-radius: 999px;
  height: 20px;
`;

const StyledGrid = styled(Grid)`
  margin: ${({ theme: $ }) => $.spacing(1)}px;
`;

const BarChartRow = ({ i, qid, isTf }) => {
  const { percent, isCorrect, numSelected } = useRecoilValue(
    optionBar({ questionId: qid, option: isTf ? !i : i })
  );

  // https://github.com/facebookexperimental/Recoil/issues/774
  if (isCorrect === undefined) return <></>;

  const { colour } = g.correctness[isCorrect];
  const avatarStyles = isTf ? g.trueFalse : g.alphabet;

  return (
    <StyledGrid
      container
      direction="row"
      justify="space-between"
      alignItems="stretch"
      wrap="nowrap"
    >
      <StyledAvatar colour={avatarStyles[i][1]}>
        {avatarStyles[i][0]}
      </StyledAvatar>
      <Tooltip
        title={`${percent}%, ${numSelected} student${
          numSelected === 1 ? '' : 's'
        }`}
      >
        <Grid container alignItems="center" style={{ position: 'relative' }}>
          <OuterBar colour={colour}>
            <InnerBar colour={colour} percent={percent} />
          </OuterBar>
        </Grid>
      </Tooltip>
    </StyledGrid>
  );
};

BarChartRow.defaultProps = {
  isTf: false,
};

BarChartRow.propTypes = {
  i: prop.number.isRequired,
  qid: prop.string.isRequired,
  isTf: prop.bool,
};

export default BarChartRow;
