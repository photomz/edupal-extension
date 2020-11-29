import React, { useEffect } from 'react';
import styled from 'styled-components';

import MuiContainer from '@material-ui/core/Container';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import Person from '../../components/Person';
import CardSkeleton from '../../components/CardSkeleton';
import { meetData, fireMessage, leaderboard } from '../../logic/common';

const Wrapper = styled(MuiContainer)`
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
`;

const LeaderboardPanel = () => {
  const { userId, meetingId } = useRecoilValue(meetData);
  const board = useRecoilValue(leaderboard);
  const sendGetLeaderboard = useSetRecoilState(fireMessage);

  useEffect(() => {
    sendGetLeaderboard({ route: 'getLeaderboard', data: { meetingId } });
  }, []);

  if (!board.length)
    return (
      <Wrapper>
        <CardSkeleton />
      </Wrapper>
    );

  return (
    <Wrapper>
      {board.map(({ name, id, avatar, change, points }, i) => {
        let trophyColor;
        switch (i + 1) {
          case 1:
            trophyColor = 'gold';
            break;
          case 2:
            trophyColor = 'silver';
            break;
          case 3:
            trophyColor = 'bronze';
            break;
          default:
            trophyColor = 'merit';
            break;
        }
        return (
          <Person
            key={id}
            name={name}
            avatar={avatar}
            change={change}
            subheader={`${points} Points`}
            highlighted={id === userId}
            iconColor={trophyColor}
          />
        );
      })}
    </Wrapper>
  );
};

export default LeaderboardPanel;
