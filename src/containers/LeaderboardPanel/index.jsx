import React, { useEffect } from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Person from '../../components/Person';
import a from '../../atoms';
import CardSkeleton from '../../components/CardSkeleton';

const FlexContainer = styled(Container)`
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
`;

const LeaderboardPanel = () => {
  const { userId, meetingId } = useRecoilValue(a.meetData);
  const board = useRecoilValue(a.leaderboard);
  const fireMessage = useSetRecoilState(a.fireMessage);

  useEffect(() => {
    fireMessage({ route: 'getLeaderboard', data: { meetingId } });
  }, []);

  if (!board.length)
    return (
      <FlexContainer>
        <CardSkeleton />
      </FlexContainer>
    );

  return (
    <FlexContainer>
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
    </FlexContainer>
  );
};

export default LeaderboardPanel;
